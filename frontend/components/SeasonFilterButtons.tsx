import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";

interface SeasonFilterButtonsProps {
  seasons: string[];
  onPress: (season: string) => void;
}

export default function SeasonFilterButtons({
  seasons,
  onPress,
}: SeasonFilterButtonsProps) {
  return (
    <View style={styles.buttonGroup}>
      {seasons.map((season, index) => (
        <Button
          key={index}
          title={season}
          buttonStyle={styles.button}
          onPress={() => onPress(season)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#86BF3E",
  },
});
