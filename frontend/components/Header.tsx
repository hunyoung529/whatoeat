import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, Text } from "@rneui/themed";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
       <FontAwesome
            name="user-o"
            size={25}
            style={{ marginLeft: 5 }} // 아이콘과 텍스트 간격 조정
          />
      <Text>ID님 환영합니다</Text>
      <Image source={require("@/assets/images/Vector.png")}
      //로고 대체 임시로 이미지 설정해놓음 
      /> 
      <Button
        icon={
          <FontAwesome
            name="pencil-square-o"
            size={25}/>
        }
        buttonStyle={styles.buttonStyle} // 버튼 스타일 수정
        containerStyle={styles.buttonContainer} // 컨테이너 스타일 수정
        titleStyle={styles.titleStyle} // 텍스트 스타일 수정
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 수평 배치를 위해 추가
    alignItems: "center", // 수직 정렬 (중앙 정렬 등)
    justifyContent: "space-between", // 요소 간 간격 조절 (필요에 따라 변경 가능)
    backgroundColor: "white",
  },
  buttonStyle: {
    backgroundColor: "transparent", // 배경을 투명하게 설정
  },
  buttonContainer: {
    padding: 0, // 버튼 외부 여백 제거
    margin: 0, // 버튼 외부 여백 제거
  },
  titleStyle: {
    color: "black", // 텍스트 색상 설정
  },
});
