import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // home/index.tsx를 가리킴
        options={{
          title: "Home", // 필요시 상단 타이틀 설정
          headerShown: false, // 상단 헤더 제거
        }}
      />
    </Stack>
  );
}