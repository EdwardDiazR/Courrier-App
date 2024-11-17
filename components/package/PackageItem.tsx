import { View, Text, Pressable, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Package } from "@/models/Package";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ProgressBar, MD3Colors } from "react-native-paper";

export default function PackageItem({ packageItem }: { packageItem: Package }) {
  const [Pressblocked, SetPressblocked] = useState<boolean>();
  const getColorByStatus = (statusId: number) => {
    switch (statusId) {
      case 1:
        return "#FF0000";
        break;
      case 2:
        return "#FF3300";
        break;
      case 3:
        return "#FF6600";
        break;
      case 4:
        return "#FF9900";
        break;
      case 5:
        return "red";
        break;
      case 6:
        return "#FFFF00";
        break;
      case 7:
        return "#CCFF00";
        break;
      case 8:
        return "#99FF00";
        break;
      case 9:
        return "#66FF00";
        break;
      case 10:
        return "green";
        break;
    }
  };

  const getStatusByStatusId = (statusId: number) => {
    switch (statusId) {
      case 1:
        return "Recibido en Miami";
        break;
      case 2:
        return "Empacado";
        break;
      case 3:
        return "Embarcado";
        break;
      case 4:
        return "Aduana";
        break;
      case 5:
        return "Retenido";
        break;
      case 6:
        return "Centro de distribucion";
        break;
      case 7:
        return "Transferido";
        break;
      case 8:
        return "Recibido en sucursal";
        break;
      case 9:
        return "Disponible";
        break;
      case 10:
        return "Retirado";
        break;
    }
  };

  const goToDetails = () => {
    SetPressblocked(true);
    router.push({
      pathname: "/package/details/[id]",
      params: { id: packageItem.id },
    });

    //This is to prevent double click and push 2 times in router
    setTimeout(() => {
      SetPressblocked(false);
    }, 1000);
  };
  return (
    <TouchableOpacity
      delayPressIn={120}
      onPress={goToDetails}
      disabled={Pressblocked}
      activeOpacity={0.8}
      style={{
        elevation: 1,
        marginVertical: 5,
        marginHorizontal: 3,
        height: "auto",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text
              style={{
                fontFamily: "Varela",
                color: Colors.brown_text,
                fontWeight: "bold",
              }}
            >
              {packageItem.id} | {packageItem.seller}
            </Text>
            <Text
              style={{
                color: "#785E4D",
                fontSize: 12,
                fontWeight: "500",
                fontFamily: "Varela",
              }}
            >
              09-04-2024
            </Text>
          </View>

          <View style={{ flexDirection: "column", gap: 5 }}>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: "white",
                paddingVertical: 1,
                paddingHorizontal: 5,
                height: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontFamily: "Varela",
                  }}
                >
                  {getStatusByStatusId(packageItem.statusId)}
                </Text>

                {packageItem.statusId === 10 && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={15}
                    color={"white"}
                  />
                )}
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <ProgressBar
                progress={packageItem.statusId / 10}
                color={getColorByStatus(packageItem.statusId)}
                style={{
                  borderRadius: 200,
                  height: 5,
                  width: 70,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column",gap:2 }}>
            <Text style={{ fontFamily: "Varela", color: Colors.brown_text }}>
              Categoria: {packageItem.category}
            </Text>

            <Text style={{ fontFamily: "Varela", color: Colors.brown_text }}>
              Peso: {packageItem.weight}lbs
            </Text>
            <Text style={{ fontFamily: "Varela", color: Colors.brown_text }}>
              Transportista: {packageItem.transportCompany}
            </Text>
            <Text style={{ fontFamily: "Varela", color: Colors.brown_text }}>
              Tracking: {packageItem.trackingId}
            </Text>
          </View>

          {packageItem.total > 0 && (
            <Text
              style={{
                alignSelf: "flex-end",
                fontFamily: "Varela",
                color: Colors.brown_text,
              }}
            >
              Total{" "}
              <Text style={{ fontWeight: "bold" }}>${packageItem.total}</Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
