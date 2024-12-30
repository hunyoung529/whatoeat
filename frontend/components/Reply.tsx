import { Image, StyleSheet, View,TextInput } from "react-native";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { Link } from "expo-router";

export default function Reply() {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>

      <View>
        <View style={styles.reply_other_box}>
          <View style={styles.reply_flex1}>
            <EvilIcons name="comment" size={30} 
             style={{
              transform: [{ scaleX: -1 }], // 수평으로 뒤집기
            }} 
            />
            <Text style={styles.id}>호랑이 </Text>
            <Text>님</Text>
          </View>
          <Text style={styles.reply_content}>너무 맛있게 잘 먹었어요!</Text>
        </View>
      </View>

      <View style={styles.reply_mine_box}>
        <View>
          <View style={styles.reply_flex1}>
          <EvilIcons name="comment" size={30} 
             style={{
              transform: [{ scaleX: -1 }], // 수평으로 뒤집기
            }} 
            />
            <Text style={styles.id}>훈영</Text>
            <Text>님</Text>
          </View>
          <Text style={styles.reply_content}>요리킹조리킹 뺨 때리실 뻔</Text>
        </View>

        <View>
        <Ionicons name="close-outline" size={20} />
        </View>
      </View>

      <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
      <TextInput
                style={styles.textInput}
                placeholder="훈영님 댓글을 남겨주세요"
                placeholderTextColor="#8A949F"
            />
           <Ionicons name="paper-plane-outline" size={20} 
           style={{
              transform: [{ scaleX: -1 }], // 수평으로 뒤집기
            }}  />
      </View>

    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10, // 전체적인 내부 여백 추가
  },
  line: {
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10, // 위아래 간격
  },
  reply_flex1: {
    flexDirection: "row",
    alignItems: "center", // 세로 중앙 정렬
  },
  id: {
    fontWeight: "bold",
    marginRight: 5, // 텍스트 간 간격
  },
  reply_content: {
    marginLeft: 28,
  },
  reply_other_box: {
    padding: 10, // 내부 패딩
    marginBottom: 10, // 아래 간격 추가
    backgroundColor: "#f9f9f9", // 시각적으로 구분하기 위해 배경색 추가
    borderRadius: 10, // 둥근 모서리 추가
  },
  reply_mine_box: {
    flexDirection: "row", // 가로 정렬
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "space-between", // 요소 간 간격
    padding: 10,
    backgroundColor: "#e8f0ff", // 배경색 추가
    borderRadius: 10, // 둥근 모서리
    marginBottom: 10, // 아래 간격 추가
  },
  inputWrapper: {
    alignItems: "center", // 중앙 정렬
    marginVertical: 10, // 위아래 간격
  },
  inputContainer: {
    flexDirection: "row", // 아이콘과 텍스트 입력을 가로로 정렬
    alignItems: "center", // 세로 정렬
    borderWidth: 1, // 테두리 두께
    borderColor: "#8A949F", // 테두리 색상
    borderRadius: 15, // 테두리 모서리를 둥글게
    paddingHorizontal: 8, // 내부 여백
    paddingVertical: 8, // 내부 여백
    width: 370, // 인풋 길이 조정
  },
  textInput: {
    flex: 1, // 입력 필드가 가용 공간을 모두 차지하도록 설정
    color: "black", // 입력 텍스트 색상
    fontSize: 16, // 텍스트 크기
  },
  icon: {
    width: 20, // 아이콘 너비
    height: 20, // 아이콘 높이
    marginLeft: 10, // 아이콘과 텍스트 입력 간격
  },
});
