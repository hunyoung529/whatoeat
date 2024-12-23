import { Text, Input, Button, Image } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList,Dimensions  } from "react-native";
import Constants from "expo-constants";

export default function Home() {
  const vegeApiKey = Constants.expoConfig?.extra?.VEGETABLE_API_KEY;
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(2);
  const [vegetableData, setVegetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const seasons = ["봄", "여름", "가을", "겨울", "전체"];
  const ITEMS_PER_PAGE = 4; // 한 페이지에 표시할 항목 수
  const { width } = Dimensions.get('window');


  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 랜덤 데이터 생성
  useEffect(() => {
    const generateData = () => {
      const items = [
        { id: 1, name: "가지", image: "https://via.placeholder.com/100" },
        { id: 2, name: "이름", image: "https://via.placeholder.com/100" },
        { id: 3, name: "계란", image: "https://via.placeholder.com/100" },
        { id: 4, name: "겨울", image: "https://via.placeholder.com/100" },
        { id: 5, name: "무", image: "https://via.placeholder.com/100" },
        { id: 6, name: "고구마", image: "https://via.placeholder.com/100" },
        { id: 7, name: "양파", image: "https://via.placeholder.com/100" },
        { id: 8, name: "파프리카", image: "https://via.placeholder.com/100" },
        { id: 9, name: "호박", image: "https://via.placeholder.com/100" },
        { id: 10, name: "마늘", image: "https://via.placeholder.com/100" },
      ];
      return items.sort(() => Math.random() - 0.5); // 랜덤 정렬
    };
    setData(generateData());
  }, []);

  //지금 인기!
  const data1 = [
    { id: 1, name: "레시피 1", image: "https://via.placeholder.com/100" },
    { id: 2, name: "레시피 2", image: "https://via.placeholder.com/100" },
    { id: 3, name: "레시피 3", image: "https://via.placeholder.com/100" },
    { id: 4, name: "레시피 4", image: "https://via.placeholder.com/100" },
    { id: 5, name: "레시피 5", image: "https://via.placeholder.com/100" },
  ];

  // 현재 페이지에 표시할 데이터 가져오기
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePress = (season) => {
    console.log(`${season} 버튼이 클릭되었습니다!`);
  };

  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        const vegeUrl = `http://211.237.50.150:7080/openapi/${vegeApiKey}/json/Grid_20171128000000000572_1/${startIndex}/${endIndex}?M_DISTCTNS=5월`;
        const response = await fetch(vegeUrl);

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        setVegetableData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchVegetableData();
  }, [startIndex, endIndex, vegeApiKey]);

  console.log(vegetableData?.Grid_20171128000000000572_1.row[0]);

  return (
    <View style={styles.container}>
      <View>
        <Input placeholder="식재료 혹은 레시피를 검색해주세요" />
      </View>
      <View style={styles.buttonGroup}>
        {seasons.map((season, index) => (
          <Button
            key={index}
            title={season}
            buttonStyle={styles.button}
            onPress={() => handlePress(season)}
          />
        ))}
      </View>

      <Text style={styles.text}>지금 제철인 재료</Text>

      {/* 랜덤 이미지 리스트 */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // 2열 그리드
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />

      {/* 페이지네이션 */}
      <View style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <TouchableOpacity
            key={index + 1}
            onPress={() => setCurrentPage(index + 1)}
            style={[
              styles.pageButton,
              currentPage === index + 1 && styles.activePageButton,
            ]}
          >
            <Text
              style={[
                styles.pageText,
                currentPage === index + 1 && styles.activePageText,
              ]}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.text}>지금 인기 레시피</Text>

      <FlatList
        data={data1}
        style={{ height: 100 }} 
        horizontal // 가로 스크롤 활성화
        showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
        renderItem={({ item }) => (
          <View style={styles.smallCard}>
            <Image source={{ uri: item.image }} style={styles.smallImage}  />
            <Text  style={styles.smallText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    
    fontSize: 16,
    fontWeight: "500",
  },

  buttonGroup: {
    flexDirection: "row", // 버튼들을 가로로 배치
    justifyContent: "space-around", // 버튼 간의 간격 조절
    flex: 1, // 버튼 그룹에만 flex 적용
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#86BF3E",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  pageButton: {
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activePageButton: {
    backgroundColor: "#333",
  },
  pageText: {
    fontSize: 14,
    color: "#000",
  },
  activePageText: {
    color: "#fff",
  },
  // 인기 레시피용 스타일
  smallCard: {
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    width: 80, // 더 작은 너비 설정
    height: 80, // 높이 줄이기
  },
  smallImage: {
    width: 50, // 이미지 크기 축소
    height: 50, // 이미지 크기 축소
    borderRadius: 6,
    marginBottom: 4,
  },
  smallText: {
    fontSize: 10, // 텍스트 크기 축소
    textAlign: 'center',
  },
});
