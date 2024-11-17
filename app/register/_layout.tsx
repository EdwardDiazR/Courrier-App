import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{ animation: "slide_from_right", headerShown: false }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="locationModal"
        options={{ presentation: "modal", animation: "simple_push" }}
      />
      <Stack.Screen name="userConfiguration" />
    </Stack>
  );
}
