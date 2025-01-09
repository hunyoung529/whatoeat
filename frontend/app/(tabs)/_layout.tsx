import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, SafeAreaView } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Header from "@/components/Header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        header: ({ navigation, route, options }) => <Header />,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute", // iOS에서 투명 배경 효과
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "레시피",
          tabBarIcon: ({ color }) => (
            <Icons name="chef-hat" size={20} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // 기본 동작 방지
            router.replace("/recipes"); // 항상 루트 페이지로 이동
          },
        }}
      />

      <Tabs.Screen
        name="like"
        options={{
          title: "좋아요",
          tabBarIcon: ({ color }) => (
            <Octicons name="heart" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: "마이",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
