import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Varela",
          fontWeight: "condensed",
        },
        tabBarActiveTintColor: Colors.primary_orange,
        headerShown: false,
        tabBarStyle: {},
      }}
      initialRouteName="pre-alert"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (tab) => (
            <Ionicons
              name={tab.focused ? "apps" : "apps-outline"}
              color={tab.color}
              size={tab.size}
            />
          ),
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="my-packages"
        options={{
          tabBarIcon: (tab) => (
            <Ionicons
              name={tab.focused ? "cube" : "cube-outline"}
              color={tab.color}
              size={tab.size}
            />
          ),
          title: "Mis paquetes",
        }}
      />
      <Tabs.Screen
        name="pre-alert"
        options={{
          tabBarIcon: (tab) => (
            <Ionicons
              name={tab.focused ? "time" : "time-outline"}
              color={tab.color}
              size={tab.size}
            />
          ),
          title: "Pre-Alertas",
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: (tab) => (
            <Ionicons
              name={tab.focused ? "person" : "person-outline"}
              color={tab.color}
              size={tab.size}
            />
          ),
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
