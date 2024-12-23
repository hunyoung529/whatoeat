import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { Link } from "expo-router";


export default function Header() {
  return   (
    <View style={styles.container}>
        
        <Image source={require('@/assets/images/favicon.png')}/>
        <Text>ID님 환영합니다</Text>
        <Image 
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}/> 
        <Button
        title="글쓰기"
        />

    </View>
  ) 
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // 수평 배치를 위해 추가
        alignItems: "center", // 수직 정렬 (중앙 정렬 등)
        justifyContent: "space-between", // 요소 간 간격 조절 (필요에 따라 변경 가능)
        padding: 20,
        backgroundColor: "white",
        flex: 1, // 필요에 따라 조정
      },
      icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      welcomeText: {
        flex: 1, // 텍스트가 공간을 차지하도록 설정
        marginHorizontal: 10,
        fontSize: 16,
        color: "#333",
      },
      logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      button: {
        backgroundColor: "#2196F3",
        paddingHorizontal: 20,
      },
 
  });
  