// IngredientGrid.tsx

import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Text } from "@rneui/themed";

interface IngredientGridProps {
  data: {
    ROW_NUM: number;
    PRDLST_NM: string;
    IMG_URL: string;
  }[];
  onPressItem?: (id: number) => void;
}

export default function IngredientGrid({
  data,
  onPressItem,
}: IngredientGridProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.ROW_NUM.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            if (onPressItem) {
              onPressItem(item.ROW_NUM);
            }
          }}
        >
          <Card containerStyle={styles.card}>
            <Card.Image
              source={{ uri: item.IMG_URL }}
              style={styles.image}
              resizeMode="center"
            />
            <Text style={styles.cardText} numberOfLines={1}>
              {item.PRDLST_NM}
            </Text>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 4,
  },
  card: {
    padding: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  cardText: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
