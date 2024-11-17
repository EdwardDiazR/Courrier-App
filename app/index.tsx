import { View, Text } from "react-native";
import React from "react";
import { Href, Redirect } from "expo-router";

export default function index() {
  return <Redirect href={"/(feed)"} />;
}
