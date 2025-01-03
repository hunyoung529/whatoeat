import { StyleSheet, Text, View, TouchableOpacity,FlatList,Image  } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";; // 하트 아이콘 사용

const type = ["한식", "양식", "일식", "중식", "기타"];

//임시 레시피 데이터
const recipes = [
  {
    id: "32",
    title: "둘이 먹다 둘이 죽는 파스타 맛",
    type:"양식",
    user_id: "파스타없음죽어",
    time: "약 15분",
    image: "https://static.wtable.co.kr/image/production/service/recipe/1767/8a70db02-325f-4dd0-9780-625a2e7cfefe.jpg", // 이미지 URL (샘플)
    likes: 33,
  },
  {
    id: "31",
    title: "매콤한 떡볶이 레시피",
    type:"한식",
    user_id: "한국음식킬러",
    time: "약 20분",
    image: "https://i.namu.wiki/i/A5AIHovo1xwuEjs7V8-aKpZCSWY2gN3mZEPR9fymaez_J7ufmI9B7YyDBu6kZy9TC9VWJatXVJZbDjcYLO2S8Q.webp",
    likes: 45,
  },
  {
    id: "3",
    title: "비법 푼다! 해물탕!",
    type:"한식",
    user_id: "소주가 좋아아",
    time: "약 1시간 30분",
    image: "https://recipe1.ezmember.co.kr/cache/recipe/2015/05/12/ea898a405bb0c70828b84b6b3ec464451.jpg",
    likes: 75,
  },
  {
    id: "4",
    title: "쪽갈비",
    type:"한식",
    user_id: "고기사냥냥",
    time: "약 1시간 30분",
    image: "https://sitem.ssgcdn.com/40/25/53/item/1000554532540_i1_750.jpg",
    likes: 75,
  },
  {
    id: "5",
    title: "초밥 만드는 법법!",
    type:"일식",
    user_id: "나는야뱃사람람",
    time: "약 10분분",
    image: "https://gurunavi.com/ko/japanfoodie/article/sushi/img/sushi_01.jpg",
    likes: 5,
  },
];



export default function Recipes() {
  const router = useRouter();

  const [selected, setSelected] = useState("한식"); // 선택된 type 버튼 상태
  //레시피 나열 카드
  const renderRecipe = ({ item }) => (
    
    <TouchableOpacity
    style={styles.card}
    onPress={() => router.push(`/recipesDetail/${item.id}`)} // 각 카드 클릭 시 상세 페이지로 이동
  >
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.user_id}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.footer}>
        <FontAwesome name="heart-o" size={18} color="gray" />
        <Text style={styles.likes}>{item.likes}</Text>
      </View>
    </View>
  </TouchableOpacity>
  )



  return (
    <View style={styles.container}>

      <View style={styles.btns}>
      {type.map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.button, selected === item && styles.selectedButton]} // 선택된 버튼에 스타일 추가
          onPress={() => setSelected(item)} // 버튼 클릭 시 상태 변경
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
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={renderRecipe}
      contentContainerStyle={styles.list}
      numColumns={2} // 한 줄에 두 개씩 배치
      showsVerticalScrollIndicator={false} // 스크롤바 숨김
      bounces={true} // 끝에서 튕김 효과
    />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
  flex: 1, // 화면 전체를 차지하도록 설정
  backgroundColor: "white",
  padding: 10, // 전체적인 내부 여백 추가
  },
  btns: {
    flexDirection: "row", // 가로로 버튼 배치
    justifyContent: "space-around", // 버튼 간 간격 일정
    alignItems: "center", // 세로 중앙 정렬
    padding: 10,
  },
  button: {
    borderWidth: 1, // 테두리 추가
    borderColor: "#ccc", // 테두리 색상
    borderRadius: 5, // 둥근 버튼
    paddingVertical: 8, // 버튼 상하 패딩
    paddingHorizontal: 15, // 버튼 좌우 패딩
    backgroundColor: "#fff", // 기본 버튼 배경색
    marginHorizontal: 5, // 버튼 간 좌우 간격
  },
  buttonText: {
    fontSize: 16,
    color: "#555", // 기본 텍스트 색상
  },
  selectedButton: {
    backgroundColor: "#8BC34A", // 선택된 버튼 배경색
    borderColor: "#8BC34A", // 선택된 버튼 테두리 색상
  },
  selectedButtonText: {
    color: "#fff", // 선택된 버튼 텍스트 색상
  },
  
  list: {
    paddingHorizontal: 10, 
    paddingBottom: 100,
    borderColor:"#B7BDC4"

  },
  
  card: {
    flex: 1, // 카드가 같은 줄에서 균등하게 배치되도록 설정
    width: "48%", // 카드의 고정 크기 설정
    margin: "2%", // 카드 간의 간격을 유지
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // 그림자 효과 (Android)
    shadowColor: "#000", // 그림자 효과 (iOS)
    borderColor: "#B7BDC4", // 테두리 색상
    borderWidth: 1, // 테두리 두께 추가
  },
  cardList:{
    padding: 10, // 내부 여백 추가
    marginTop: 10, // 상단 여백
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
