import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fontSize } from "@/constants/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { BounceInUp } from "react-native-reanimated";

export default function CustomDrawer(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{}}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            backgroundColor: 'white',
           
            marginVertical: 15,
            marginHorizontal:5,
            alignItems: "center",
           
            gap:5
          }}
        >
          <Animated.View entering={BounceInUp.delay(500).duration(800)}>
            <FontAwesome5
              name="paper-plane"
              size={24}
              color={Colors.secondary_orange}
            />
          </Animated.View>

          <Text
            style={{
              color: Colors.secondary_orange,
              fontFamily: "Signika",
              fontSize: fontSize.lg,
            }}
          >
            FlyPack
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          padding: 10,
          justifyContent: "center",

          paddingBottom: bottom + 20,
        }}
      >
        <Text style={{ color: "black", fontWeight: "700" }}>
          Edward Diaz Software
        </Text>
      </View>
    </View>
  );
}
