// HomeScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import Constants from "expo-constants";

import SeasonFilterButtons from "@/components/SeasonFilterButtons";
import IngredientGrid from "@/components/home/IngredientGrid";
import Pagination from "@/components/home/Pagination";
import { useRouter } from "expo-router";
import { useIngredientContext } from "@/contexts/IngredientContext";

export default function HomeScreen() {
  const router = useRouter();
  const vegeApiKey = Constants.expoConfig?.extra?.VEGETABLE_API_KEY;

  const [startIndex] = useState(1);
  const [endIndex] = useState(300);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 전체 데이터 (한 번만 API로 불러와서 저장)
  const { allData, setAllData } = useIngredientContext();

  // 시즌 필터 적용된 데이터
  const [seasonData, setSeasonData] = useState<any[]>([]);
  // 현재 선택된 시즌
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  // 검색 관련
  const [searchQuery, setSearchQuery] = useState(""); // Input 창에 입력된 검색어
  const [searchData, setSearchData] = useState<any[]>([]); // 검색 버튼 클릭시 필터링된 결과

  // 페이지네이션
  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 현재 보여줄 데이터 결정:
   * - searchData가 비어 있지 않으면 => 검색 결과 우선
   * - 검색 결과가 비어 있으면 => 시즌 필터 결과
   */
  const displayData = searchData.length > 0 ? searchData : seasonData;

  const totalPages = Math.ceil(displayData.length / ITEMS_PER_PAGE);
  const paginatedData = displayData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // [도우미] 월 -> 계절
  const getSeasonFromMonth = (month: number) => {
    if ([12, 1, 2].includes(month)) return "겨울";
    if ([3, 4, 5].includes(month)) return "봄";
    if ([6, 7, 8].includes(month)) return "여름";
    return "가을";
  };

  // [도우미] 계절 -> months
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
        return []; // "전체" 같은 경우
    }
  };

  // [도우미] 시즌 필터 함수
  const filterBySeason = (season: string, sourceData: any[]) => {
    if (season === "전체") {
      return sourceData;
    }
    const months = getMonthsBySeason(season);

    return sourceData.filter((item) => {
      if (!item.M_DISTCTNS) return false;

      const monthStrings = item.M_DISTCTNS.split(",").filter(Boolean);
      // ex) "3월,4월,5월," -> ["3월","4월","5월"]

      return monthStrings.some((mStr: string) => {
        const justNumber = parseInt(mStr.replace("월", ""), 10);
        return months.includes(justNumber);
      });
    });
  };

  // [도우미] 검색 필터 함수 (전체 데이터 대상)
  const filterBySearch = (search: string, sourceData: any[]) => {
    if (!search || search.trim() === "") {
      return []; // 검색어가 없으면 빈 배열
    }
    const lowerSearch = search.toLowerCase();
    return sourceData.filter((item) => {
      // 여기서는 item.PRDLST_NM 에서 검색 (예시)
      const itemName = item.PRDLST_NM?.toLowerCase() ?? "";
      return itemName.includes(lowerSearch);
    });
  };

  /**
   * [핸들러] 시즌 버튼 눌렀을 때
   */
  const handleSeasonPress = (season: string) => {
    setSelectedSeason(season);
    setCurrentPage(1);
    // 검색 결과 초기화 (검색모드 해제)
    setSearchData([]);
  };

  /**
   * [핸들러] 검색어가 Input에서 바뀔 때
   * - 여기서는 단순히 searchQuery만 업데이트
   * - 즉시 검색(필터)하지 않는다.
   */
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  /**
   * [핸들러] 검색 버튼 누르면 => 전체 데이터 중에서 필터
   */
  const handleSearchSubmit = () => {
    // 검색어가 비어있다면, 검색 해제
    if (!searchQuery.trim()) {
      setSearchData([]);
      return;
    }
    // 전체 데이터에서 검색
    const result = filterBySearch(searchQuery, allData);
    setSearchData(result);

    // 페이지네이션 리셋
    setCurrentPage(1);
  };

  const handlePressItem = (id: number) => {
    router.push({
      pathname: "/(tabs)/home/[ingredientId]",
      params: { ingredientId: String(id) },
    });
  };
  /**
   * 앱 최초 실행 시 전체 데이터 fetch
   * + 현재 달의 계절로 초기 시즌 설정
   */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError("");

        const vegeUrl = `http://211.237.50.150:7080/openapi/${vegeApiKey}/json/Grid_20171128000000000572_1/${startIndex}/${endIndex}`;
        const res = await fetch(vegeUrl);
        if (!res.ok) {
          throw new Error(`API 오류: ${res.status}`);
        }
        const jsonData = await res.json();

        const rows = jsonData.Grid_20171128000000000572_1?.row || [];
        setAllData(rows);

        // 현재 달에 맞춰 기본 시즌 선택
        const currentMonth = new Date().getMonth() + 1;
        const defaultSeason = getSeasonFromMonth(currentMonth);
        setSelectedSeason(defaultSeason);
      } catch (err) {
        console.error(err);
        setError("전체 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  /**
   * allData 혹은 selectedSeason가 바뀔 때마다, 시즌 필터를 적용하여 seasonData를 업데이트
   */
  useEffect(() => {
    if (allData.length > 0 && selectedSeason) {
      const filtered = filterBySeason(selectedSeason, allData);
      setSeasonData(filtered);
    }
  }, [allData, selectedSeason]);

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
      {/* 검색 영역 (Input + Button) */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="재료 혹은 레시피 검색"
          onChangeText={handleSearchChange}
          value={searchQuery}
          containerStyle={{ flex: 1 }}
        />
        <Button
          title="검색"
          onPress={handleSearchSubmit}
          buttonStyle={{ marginLeft: 8 }}
        />
      </View>

      {/* 시즌 필터 버튼 그룹 */}
      <SeasonFilterButtons
        seasons={["봄", "여름", "가을", "겨울", "전체"]}
        onPress={handleSeasonPress}
      />

      <Text style={styles.title}>
        현재 보기:{" "}
        {searchData.length > 0 ? "검색 결과" : `${selectedSeason} 제철`}
      </Text>

      {/* 그리드 (페이지네이션 적용) */}
      <IngredientGrid data={paginatedData} onPressItem={handlePressItem} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
});
