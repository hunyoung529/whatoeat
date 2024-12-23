import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

interface RowData {
  COOK_MTH: string;
  PRDLST_NM: string;
  [key: string]: any;
}

interface GridData {
  endRow: number;
  result: { code: string; message: string };
  row: RowData[];
  startRow: number;
  totalCnt: number;
}

interface ApiResponse {
  Grid_20171128000000000572_1: GridData;
}

export default function Home() {
  const vegeApiKey = Constants.expoConfig?.extra?.VEGETABLE_API_KEY;
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(2);
  const [vegetableData, setVegetableData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        const vegeUrl = `http://211.237.50.150:7080/openapi/${vegeApiKey}/json/Grid_20171128000000000572_1/${startIndex}/${endIndex}?M_DISTCTNS=5월`;
        const response = await fetch(vegeUrl);

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); // 데이터 구조 확인
        setVegetableData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchVegetableData();
  }, [startIndex, endIndex, vegeApiKey]);

  console.log(vegetableData?.Grid_20171128000000000572_1);

  return (
    <View style={styles.container}>
      <Text style={styles.text}></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
});
