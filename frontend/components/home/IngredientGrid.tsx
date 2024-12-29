import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

interface IngredientGridProps {
  data: { ROW_NUM: number; PRDLST_NM: string; IMG_URL: string }[];
}

export default function IngredientGrid({ data }: IngredientGridProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.ROW_NUM.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.IMG_URL }} style={styles.image} />
          <Text style={styles.cardText}>{item.PRDLST_NM}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
