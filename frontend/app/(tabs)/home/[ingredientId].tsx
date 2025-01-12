import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useIngredientContext } from "@/contexts/IngredientContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function IngredientDetailScreen() {
  const { ingredientId } = useLocalSearchParams();
  const { allData } = useIngredientContext(); // 전역에서 받아옴
  const router = useRouter();

  // allData 중에서 ROW_NUM(숫자)가 ingredientId(문자열)와 같은 것 찾기
  const selectedIngredient = allData.find(
    (item) => item.ROW_NUM === Number(ingredientId)
  );

  if (!selectedIngredient) {
    return (
      <View style={styles.container}>
        <Text>해당 식재료를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          재료 상세: {selectedIngredient.PRDLST_NM}
        </Text>
        {/* 오른쪽 아이콘 자리(옵션) 없으면 공백 뷰로 처리 */}
        <View style={{ width: 24 }} />
      </View>

      {/* 재료 상세 정보 섹션 */}
      <View style={styles.detailSection}>
        <Text style={styles.ingredientName}>
          {selectedIngredient.PRDLST_NM}
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.ingredientImage}
            source={{ uri: selectedIngredient.IMG_URL }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>제철</Text>
          <Text style={styles.infoContent}>
            {selectedIngredient.PRDCTN__ERA}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>효능</Text>
          <Text style={styles.infoContent}>{selectedIngredient.EFFECT}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>주요 산지</Text>
          <Text style={styles.infoContent}>{selectedIngredient.MTC_NM}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>구입 요령</Text>
          <Text style={styles.infoContent}>
            {selectedIngredient.PURCHASE_MTH}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoTitle}>손질 요령</Text>
          <Text style={styles.infoContent}>{selectedIngredient.TRT_MTH}</Text>
        </View>
      </View>

      <View style={styles.recipeSection}>
        <Text style={styles.recipeSectionTitle}>추천 레시피</Text>
        {/* 
          여기서 예: 수평 슬라이드(Horizontal Scroll)나 FlatList를 통해 
          관련 레시피 썸네일+이름 등을 표시할 수 있습니다.
          지금은 간단하게 "준비중" 텍스트만 표시
        */}
        <Text>준비 중...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: -24,
  },

  detailSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  ingredientName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientImage: {
    width: "100%",
    height: "100%",
  },

  infoBlock: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },

  recipeSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  recipeSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
});
