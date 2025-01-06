import { Stack } from "expo-router";

export default function RecipesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // recipes/index.tsx를 가리킴
        options={{
          title: "Recipes",

          headerShown: false, // 상단 헤더 제거
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false, // [id] 페이지의 헤더를 숨김
        }}
      />
    </Stack>
  );
}
