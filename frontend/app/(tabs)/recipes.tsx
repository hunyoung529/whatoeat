import { StyleSheet, Text, View, ActivityIndicator,FlatList,Image} from "react-native";
//import { RECIPES_API_KEY } from ''; // '@env'로 환경 변수 가져오기
import { useEffect, useState } from "react";
import Constants from "expo-constants";
export default function Recipes() {
  const RECIPES_API_KEY = Constants.expoConfig?.extra?.RECIPES_API_KEY;
  const API_URL = `http://openapi.foodsafetykorea.go.kr/api/${RECIPES_API_KEY}/COOKRCP01/json/1/5`;
  console.log("API_KEY:", RECIPES_API_KEY);
  console.log("API_URL:", API_URL);

  const [recipes, setRecipes] = useState([]); // 레시피 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출 함수
  const fetchRecipes = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json(); // JSON 데이터 파싱
      const recipes = data.COOKRCP01?.row || []; // API 응답 구조에 맞게 데이터 파싱
      setRecipes(recipes);
    } catch (err) {
      setError(err.message); // 에러 저장
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchRecipes();
  }, []);

  // 로딩 중일 때
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading recipes...</Text>
      </View>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // "\n"으로 데이터를 나누고 첫 번째 줄 제외
          const partsDetails = item.RCP_PARTS_DTLS.split("\n")
            .slice(1)
            .join("\n");

          return (
            <View style={styles.recipeItem}>
              <Text style={styles.recipeTitle}>{item.RCP_NM}</Text>
              <View style={styles.recipeImageContainer}>
              <Image style={styles.recipeImage} 
                source={{ uri: item.ATT_FILE_NO_MK }}
                resizeMode="contain" // 비율 유지하며 전체 표시
              />

              </View>
             
              <Text style={styles.sectionHeader}>재료</Text>
              <Text>{partsDetails}</Text>
              <Text style={styles.sectionHeader}>요리순서</Text>
              <Text>{item.MANUAL01}</Text>
              <Text>{item.MANUAL02}</Text>
              <Text>{item.MANUAL03}</Text>

              <Text style={styles.sectionHeader}>저감 요리법</Text>
              <Text>{item.RCP_NA_TIP}</Text>



              
            </View>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeItem: {
    marginBottom: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  
  recipeImageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // 디버깅용 배경색
    borderRadius: 8,
    overflow: "hidden", // 둥근 모서리 효과
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%", // 부모 크기에 맞춤
    height: "100%", // 부모 크기에 맞춤
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});

