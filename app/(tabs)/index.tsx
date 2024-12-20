import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Button, Input } from "@rneui/themed";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Input
        placeholder="이메일을 입력해주세요."
        leftIcon={{ type: "feather", name: "mail" }}
        onChangeText={setEmail}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="비밀번호를 입력해주세요."
        leftIcon={{ type: "feather", name: "lock" }}
        secureTextEntry // 비밀번호 가리기
        value={password}
        onChangeText={setPassword}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <View style={styles.socialButtonsContainer}>
        <Button
          title="회원가입"
          type="clear"
          titleStyle={styles.socialButtonText}
          containerStyle={styles.socialButtonContainer}
        />
        <Button
          title="소셜 로그인"
          type="clear"
          titleStyle={styles.socialButtonText}
          containerStyle={styles.socialButtonContainer}
        />
        <Button
          title="소셜 로그인"
          type="clear"
          titleStyle={styles.socialButtonText}
          containerStyle={styles.socialButtonContainer}
        />
      </View>
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
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#4CAF50", // 초록색
    paddingVertical: 12,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  socialButtonContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    padding: 15,
    width: 80,
    height: 80,
  },
  socialButtonText: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
  },
});
