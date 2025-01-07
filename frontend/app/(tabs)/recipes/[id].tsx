import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router"; // useRouter 사용
import Constants from "expo-constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Reply from "@/components/Reply";




export default function RecipesDetail() {
  const router = useRouter(); // 라우터 객체

  const { id } = useLocalSearchParams(); // 동적 경로 파라미터 가져오기

  const RECIPES_API_KEY = Constants.expoConfig?.extra?.RECIPES_API_KEY;
  const API_URL = `http://openapi.foodsafetykorea.go.kr/api/${RECIPES_API_KEY}/COOKRCP01/json/1/100`;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipeById = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      const recipes = data.COOKRCP01?.row || [];

      // id와 RCP_SEQ가 일치하는 레시피 찾기
      const matchedRecipe = recipes.find((item) => Number(item.RCP_SEQ) === Number(id));
      if (!matchedRecipe) {
        throw new Error("Recipe not found");
      }

      setRecipe(matchedRecipe);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeById();
    }
  }, [id]);

  if (!id) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Invalid or missing recipe ID</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{`레시피 상세: ${recipe.RCP_NM}`}</Text>
      </View>

      <View style={styles.recipeDetail}>
        <Text style={styles.recipeTitle}>{recipe.RCP_NM}</Text>
        <View style={styles.recipeImageContainer}>
          <Image
            style={styles.recipeImage}
            source={{ uri: recipe.ATT_FILE_NO_MK }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.sectionHeader}>재료</Text>
        <Text>{recipe.RCP_PARTS_DTLS}</Text>
        <Text style={styles.sectionHeader}>요리 순서</Text>
        <Text>{recipe.MANUAL01}</Text>
        <Text>{recipe.MANUAL02}</Text>
        <Text>{recipe.MANUAL03}</Text>
        <Text style={styles.sectionHeader}>요리 팁</Text>
        <Text>{recipe.RCP_NA_TIP}</Text>
      </View>
      <View>
      <Reply/>
      </View>
    
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  recipeDetail: {
    marginTop: 16,
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
