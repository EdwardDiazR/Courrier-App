import { View, Text, Pressable } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import CustomDrawer from "@/components/shared/CustomDrawer";
import { Colors } from "@/constants/Colors";

export default function _layout() {
  const { top } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawer}
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: false,
          drawerActiveBackgroundColor: Colors.primary_orange,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor:'black',
          drawerLabelStyle:{marginLeft:-22},
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Inicio",
            drawerLabel: "Inicio",
            drawerIcon: ({ size, color }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="locations"
          options={{
            title: "Sucursales",
            drawerLabel: "Sucursales",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="storefront-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
