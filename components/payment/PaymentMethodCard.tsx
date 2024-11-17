import { Colors } from "@/constants/Colors";
import { colors } from "@/constants/constants";
import {
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";

export default function PaymentMethodCard({
  cardBrand,
  cardType,
  maskedNumber,
  isSelected,
  isPrincipal,
  SelectCard,
}: {
  cardBrand: string;
  cardType: string;
  maskedNumber: string;
  isSelected: boolean;
  isPrincipal: boolean;
  SelectCard: (type: string) => void;
}) {
  const [CardBrandImage, SetCardBrandImage] = useState<string>();
  const VISA_LOGO_IMAGE = require("@/assets/icons/visa-logo.png");
  const MC_LOGO_IMAGE = require("@/assets/icons/mc-logo.png");

  useEffect(() => {}, []);

  const lightTheme = {
    backgroundColor: Colors.primary_orange,
  };

  const handleSelection = () => {
    SelectCard(cardBrand);
  };
  return (
    <Pressable
      android_ripple={{
        color: "#FFB84D",
        foreground: true,
        borderless: false,
        radius: -1,
      }}
      onPress={handleSelection}
      style={{
        backgroundColor: isSelected ? "#FFB84D" : colors.lightgray_background,
        height: 80,
        borderRadius: 12,
        padding: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* CARD BRAND IMAGE */}
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            width: 65,
          }}
        >
          <Image
            source={cardBrand == "MC" ? MC_LOGO_IMAGE : VISA_LOGO_IMAGE}
            style={{ objectFit: "contain", width: 50, height: 50 }}
          />
        </View>

        <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text
                style={{
                  fontFamily: "SignikaSemiBold",
                  color: isSelected ? "white" : "gray",
                  fontSize: 15,
                }}
              >
                {cardBrand} {cardType}
              </Text>
              {isPrincipal && (
                <View
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 5,
                    borderRadius: 7,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.7,
                    borderColor: !isSelected ? colors.success_green : "white",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Signika",
                      color: isSelected
                        ? Colors.primary_orange
                        : colors.success_green,
                    }}
                  >
                    Principal
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: "Signika",
                color: isSelected ? "white" : "gray",
                fontSize: 13.5,
              }}
            >
              {maskedNumber}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: isSelected ? Colors.primary_orange : "white",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              height: 35,
              width: 35,
              alignSelf: "center",
              borderRadius: 100,
            }}
          >
            {isSelected && (
              <FontAwesome5 name="check" size={20} color={"white"} />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
