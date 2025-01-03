import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import Header from "@/components/Header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        header:({ navigation, route, options })=> <Header navigation={navigation}/>,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="like"
        options={{
          title: "like",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: "my",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
