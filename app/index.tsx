import { Image, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인 눌렀따리");
  };

  const handleSignUpGoogle = () => {
    console.log("구글 로그인 눌렀따리");
  };

  const handleSignUpKakao = () => {
    console.log("카카오 로그인 눌렀따리");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.logo}
      />
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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />

      <Button
        title="로그인"
        buttonStyle={styles.loginButton}
        onPress={handleLogin}
      />

      <View style={styles.socialButtonsContainer}>
        <Link href="/signup" style={styles.socialLoginButton}>
          <Text>회원가입</Text>
        </Link>
        <Button
          title="Google"
          type="outline"
          buttonStyle={styles.socialLoginButton}
          onPress={handleSignUpGoogle}
        />
        <Button
          title="Kakao"
          type="outline"
          buttonStyle={styles.socialLoginButton}
          onPress={handleSignUpKakao}
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
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  socialLoginButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 15,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
});
