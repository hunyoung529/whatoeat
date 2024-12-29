import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Input } from "@rneui/themed";
import Constants from "expo-constants";

import SeasonFilterButtons from "@/components/SeasonFilterButtons";
import IngredientGrid from "@/components/home/IngredientGrid";
import Pagination from "@/components/home/Pagination";

export default function HomeScreen() {
  const vegeApiKey = Constants.expoConfig?.extra?.VEGETABLE_API_KEY;

  // API 요청 범위 (필요에 따라 조정)
  const [startIndex] = useState(1);
  const [endIndex] = useState(300); // 충분히 넉넉하게 잡는 게 좋을 수 있음

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 전체 데이터 (한 번만 API로 불러오고 보관)
  const [allData, setAllData] = useState<any[]>([]);
  // 실제로 화면에 필터링되어 보여줄 데이터
  const [data, setData] = useState<any[]>([]);

  // 계절 필터 버튼
  const seasons = ["봄", "여름", "가을", "겨울", "전체"];

  // 화면 너비 (필요하다면 사용)
  const { width } = Dimensions.get("window");

  // 페이지네이션
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /**
   * [도우미] 월 -> 계절
   */
  const getSeasonFromMonth = (month: number) => {
    if ([12, 1, 2].includes(month)) return "겨울";
    if ([3, 4, 5].includes(month)) return "봄";
    if ([6, 7, 8].includes(month)) return "여름";
    return "가을";
  };

  /**
   * [도우미] 계절 -> months 배열
   */
  const getMonthsBySeason = (season: string) => {
    switch (season) {
      case "봄":
        return [3, 4, 5];
      case "여름":
        return [6, 7, 8];
      case "가을":
        return [9, 10, 11];
      case "겨울":
        return [12, 1, 2];
      default:
        return []; // "전체" 등
    }
  };

  /**
   * [도우미] allData 중에서 '계절'에 맞는 데이터만 필터링
   * - M_DISTCTNS: "5월" 또는 "3월,4월,5월" 형태라면,
   *   콤마(,)로 split한 뒤 각각 "5월" -> 숫자 5 추출
   */
  const filterBySeason = (season: string) => {
    // "전체"면 그냥 전체 반환
    if (season === "전체") {
      return allData;
    }

    const months = getMonthsBySeason(season); // 예: [3,4,5]

    // 예) M_DISTCTNS="3월,4월,5월," 형태로 들어오는 경우도 있으므로 ','로 split
    //     "3월" -> 3으로 추출
    const filtered = allData.filter((item) => {
      if (!item.M_DISTCTNS) return false;

      // "3월,4월,5월," -> ["3월","4월","5월",""]
      // 빈 문자열 필터링
      const monthStrings = item.M_DISTCTNS.split(",").filter(Boolean);

      // 하나라도 months 배열에 포함되면 true
      return monthStrings.some((mStr: string) => {
        const justNumber = parseInt(mStr.replace("월", ""), 10); // "5월" -> 5
        return months.includes(justNumber);
      });
    });

    return filtered;
  };

  /**
   * [핸들러] 시즌 버튼을 눌렀을 때 (API 재호출 X, local filter)
   */
  const handleSeasonPress = (season: string) => {
    try {
      setError("");
      setLoading(true);
      setCurrentPage(1); // 필터 바뀌면 페이지도 1로 리셋

      const filteredData = filterBySeason(season);
      setData(filteredData);
    } catch (err) {
      console.error(err);
      setError("필터링 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 화면 첫 진입 시, 전체 데이터를 한 번 가져오고
   * 가져온 후 현재 달(계절)로 초기 필터를 적용
   */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError("");

        // "전체" 데이터 한번에 불러오기
        const vegeUrl = `http://211.237.50.150:7080/openapi/${vegeApiKey}/json/Grid_20171128000000000572_1/${startIndex}/${endIndex}`;
        const res = await fetch(vegeUrl);
        if (!res.ok) {
          throw new Error(`API 오류: ${res.status}`);
        }
        const jsonData = await res.json();

        // row만 추출
        const rows = jsonData.Grid_20171128000000000572_1?.row || [];
        setAllData(rows);

        // 2. 초기 계절 필터 적용
        const currentMonth = new Date().getMonth() + 1; // 1~12
        const defaultSeason = getSeasonFromMonth(currentMonth);
        const filteredData = filterBySeason(defaultSeason);
        setData(filteredData);
      } catch (err) {
        console.error(err);
        setError("전체 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 로딩/에러 처리
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 검색 영역 */}
      <Input placeholder="식재료 혹은 레시피를 검색해주세요" />

      {/* 시즌 필터 버튼 그룹 */}
      <SeasonFilterButtons seasons={seasons} onPress={handleSeasonPress} />

      <Text style={styles.title}>지금 제철인 재료</Text>

      {/* 제철 재료 그리드 (페이지네이션 적용된 결과) */}
      <IngredientGrid data={paginatedData} />

      {/* 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Text style={styles.title}>지금 인기 레시피</Text>
      {/* <PopularRecipesHorizontal data={someData} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
});
