import { View, Text, StyleSheet, RefreshControl, FlatList } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenPadding } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { PreAlert } from "@/models/Package";
import { PreAlertItem } from "@/components/package/PreAlertItem";

export default function preAlert() {
  const { top } = useSafeAreaInsets();

  const prealerts: PreAlert[] = [
    {
      article: "Ropa",
      fobUSD: 25.32,
      supplier: "Amazon",
      tracking: "AJSFM325809ASNCZ",
      transportist: "USPS",
      receptionDate: null,
      created_at: "22/9/24",
    },
    {
      article: "Perfume",
      fobUSD: 124.0,
      supplier: "Ebay",
      tracking: "ADMC93AASD93",
      transportist: "UPS",
      receptionDate: null,
      created_at: "22/9/24",
    },
  ];
  return (
    <View style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: true,

          header: () => (
            <View
              style={[
                {
                  paddingTop: top,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 80,
                  paddingHorizontal: screenPadding.horizontal,
                },
              ]}
            >
              <Text style={{ fontFamily: "Varela", fontSize: 22 }}>
                Pre alertas
              </Text>

              <Ionicons
                name="add"
                size={33}
                color={Colors.secondary_orange}
                style={{ alignSelf: "center" }}
              />
            </View>
          ),
        }}
      />

      <FlatList
        style={{ flex: 1 }}
        data={prealerts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: PreAlert }) => (
          <PreAlertItem key={item.tracking} PreAlertItem={item} />
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
