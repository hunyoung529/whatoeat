import { Stack } from "expo-router";

export default function MyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // like/index.tsx를 가리킴
        options={{
          title: "My",
          headerShown: false, // 상단 헤더 제거
        }}
      />
    </Stack>
  );
}