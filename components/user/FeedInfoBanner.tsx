import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function FeedInfoBanner() {
  return (
    <View
      style={{
        backgroundColor: Colors.primary_orange,
        borderBottomLeftRadius: 45,
        borderTopLeftRadius: 45,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        padding: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 100,
          overflow: "hidden",
          width: 50,
          height: 50,
          borderWidth: 2.2,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRazGKny1CSlH3XZGzdceONvBwSZqNVKklLnA&s",
          }}
          style={{ height: 50, width: 50, flex: 1, objectFit: "cover" }}
        />
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ fontFamily: "Signika", color: "white", fontSize: 17 }}>
          Saludos,
        </Text>
        <Text
          style={{
            fontFamily: "Signika",
            fontWeight: "600",
            color: "white",
            fontSize: 16,
          }}
        >
          Alan
        </Text>
      </View>

      <View style={{ marginRight: 5 }}>
        <Ionicons name="notifications-outline" size={25} color={"white"} />
      </View>
    </View>
  );
}
