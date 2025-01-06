import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RecipesLayout() {
    const router = useRouter();

    useEffect(() => {
        // 탭 클릭 시 항상 index로 이동
        const unsubscribe = router.events?.on("focus", (event) => {
          if (event.url === "/recipes") {
            router.replace("/recipes");
          }
        });
    
        return () => {
          unsubscribe?.();
        };
      }, [router]);

      

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