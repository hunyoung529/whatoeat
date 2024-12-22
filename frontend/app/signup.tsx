import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";

interface SignUpFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (name: keyof SignUpFormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("회원가입 실패", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // // 실제 회원가입 로직
    // console.log("회원가입 정보:", formData);
    // router.replace("/(tabs)/home"); // 임시로 메인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
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
