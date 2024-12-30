import { Tabs } from "expo-router";
import React from "react";
import { Platform, StatusBar, SafeAreaView  } from "react-native"; //헤더 위치 조절
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { HapticTab } from "@/components/HapticTab";
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
        header: ({ navigation, route, options }) => (

          <Header navigation={navigation} />
      
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute", // iOS에서 투명 배경 효과
           
          },
          default: {
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarLabelStyle: {
          
          },
          tabBarIcon: ({ color}) => (
          <Octicons name = "home" size={20} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "recipes",
          tabBarIcon: ({ color }) => (
            <Icons name= "chef-hat" size={20} color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="like"
        options={{
          title: "like",
          tabBarIcon: ({ color }) => (
            <Octicons name = "heart" size={20} color={color}/>
          ),
        }}
      />

      <Tabs.Screen
        name="my"
        options={{
          title: "my",
          tabBarIcon: ({ color }) => (
           <Feather name="user" size={20} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
