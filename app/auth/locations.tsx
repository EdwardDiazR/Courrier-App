import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function locations() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{}}>
      <Drawer.Screen options={{ headerShown: true }} />
      <Text>Sucursales</Text>
    </View>
  );
}
