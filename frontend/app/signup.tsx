import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";
import { signup } from "@/api"; // API 호출 함수 import

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "", // 닉네임 초기값 추가
  });

  const handleChange = (name: keyof SignUpFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("회원가입 실패", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await signup(signupData);

      Alert.alert(
        "회원가입 성공",
        response.message || "회원가입이 완료되었습니다."
      );
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert(
        "회원가입 실패",
        error.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address" // 이메일 키보드 타입 설정
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={formData.nickname}
        onChangeText={(text) => handleChange("nickname", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
