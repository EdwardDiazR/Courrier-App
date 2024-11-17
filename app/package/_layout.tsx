import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="pay" />
    </Stack>
  );
}
