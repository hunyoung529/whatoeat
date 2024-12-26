import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button, Input } from "@rneui/themed";

interface SignUpFormData {
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChange = (name: keyof SignUpFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      console.log("비밀번호 다름");

      return;
    }
    setPasswordError(""); // 에러 메시지 초기화
    console.log("메시지 초기화");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Input
        inputContainerStyle={styles.inputContainer}
        style={styles.input}
        placeholder="이메일"
        inputMode="email"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <Input
        inputContainerStyle={styles.inputContainer}
        style={styles.input}
        placeholder="닉네임"
        value={formData.nickname}
        onChangeText={(text) => handleChange("nickname", text)}
      />

      <Input
        inputContainerStyle={styles.inputContainer}
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        errorMessage={passwordError}
      />
      <Input
        inputContainerStyle={styles.inputContainer}
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      <Button
        title="회원가입"
        buttonStyle={styles.signUpButton}
        onPress={handleSignup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  signUpButton: {
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
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
});
