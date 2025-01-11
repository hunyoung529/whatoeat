import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useIngredientContext } from "@/contexts/IngredientContext";

export default function IngredientDetailScreen() {
  const { ingredientId } = useLocalSearchParams();
  const { allData } = useIngredientContext(); // 전역에서 받아옴

  // allData 중에서 ROW_NUM(숫자)이 ingredientId(문자열)와 같은 것 찾기
  const detail = allData.find((item) => item.ROW_NUM === Number(ingredientId));

  if (!detail) {
    return (
      <View style={styles.container}>
        <Text>해당 식재료를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{detail.PRDLST_NM}</Text>
      <Text>{detail.EFFECT}</Text>
      {/* 그 외 detail.필드들 렌더링 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
});
