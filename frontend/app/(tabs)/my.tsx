import RecipesDetail from "@/components/RecipesDetail";
import React from "react";
import { StyleSheet,Text,View, ActivityIndicator,FlatList,} from "react-native";
function My() {
  return  (

    <View style={styles.container}>
      <Text> 여기다가 MY PAGE를~</Text>
      <RecipesDetail/>

     
    </View>
  )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: "center", // 세로 정렬
    alignItems: "center", // 가로 정렬
    backgroundColor: "#f8f8f8", // 배경 색상 (옵션)
  },
});

export default My;
