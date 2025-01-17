import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // 하트 아이콘 사용

const type = ["한식", "양식", "일식", "중식", "기타"];

// 임시 레시피 데이터
const recipes = [
  {
    id: "28",
    title: "둘이 먹다 둘이 죽는 파스타 맛",
    type: "양식",
    user_id: "파스타없음죽어",
    time: "약 15분",
    image: "https://static.wtable.co.kr/image/production/service/recipe/1767/8a70db02-325f-4dd0-9780-625a2e7cfefe.jpg",
    likes: 33,
    isLiked: true, // 좋아요 상태 추가
  },
  {
    id: "29",
    title: "매콤한 떡볶이 레시피",
    type: "한식",
    user_id: "한국음식킬러",
    time: "약 20분",
    image: "https://i.namu.wiki/i/A5AIHovo1xwuEjs7V8-aKpZCSWY2gN3mZEPR9fymaez_J7ufmI9B7YyDBu6kZy9TC9VWJatXVJZbDjcYLO2S8Q.webp",
    likes: 45,
    isLiked: true,
  },
  // 나머지 레시피 데이터 추가...
];

export default function Recipes() {
  const router = useRouter();
  const [selected, setSelected] = useState("한식"); // 선택된 type 버튼 상태
  const [recipeList, setRecipeList] = useState(recipes); // 좋아요 상태를 관리하는 배열

  // 좋아요 토글 함수
  const toggleLike = (id) => {
    setRecipeList((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              isLiked: !recipe.isLiked, // 좋아요 상태 변경
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1, // 좋아요 수 증가/감소
            }
          : recipe
      )
    );
  };

  // 레시피 카드 렌더링
  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`/recipes/${item.id}`);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.user_id}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <FontAwesome
              name={item.isLiked ? "heart" : "heart-o"}
              size={18}
              color={item.isLiked ? "red" : "gray"} // 좋아요 상태에 따라 색상 변경
            />
          </TouchableOpacity>
          <Text style={styles.likes}>{item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.btns}>
          {type.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.button, selected === item && styles.selectedButton]}
              onPress={() => setSelected(item)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selected === item && styles.selectedButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardList}>
          <FlatList
            data={recipeList.filter((recipe) => recipe.type === selected)} // 선택된 타입에 맞는 데이터 필터링
            keyExtractor={(item) => item.id}
            renderItem={renderRecipe}
            contentContainerStyle={styles.list}
            numColumns={2} // 한 줄에 두 개씩 배치
            showsVerticalScrollIndicator={false} // 스크롤바 숨김
            bounces={true} // 끝에서 튕김 효과
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 기존 스타일 그대로 유지
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#555",
  },
  selectedButton: {
    backgroundColor: "#8BC34A",
    borderColor: "#8BC34A",
  },
  selectedButtonText: {
    color: "#fff",
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    width: "48%",
    margin: "2%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    borderColor: "#B7BDC4",
    borderWidth: 1,
  },
  cardList: {
    padding: 10,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
});