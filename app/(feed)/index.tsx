import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { Redirect, router, Stack } from "expo-router";
import FeedInfoBanner from "@/components/user/FeedInfoBanner";
import PackageItem from "@/components/package/PackageItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Package, StatusHistorial } from "@/models/Package";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Chip } from "react-native-paper";
import { colors, screenPadding } from "@/constants/constants";

export default function index() {
  const { top } = useSafeAreaInsets();

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
  const historial: StatusHistorial[] = [
    {
      status: "Disponible",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "En sucursal",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "Centro de distribucion",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "Aduana",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "Embarcado",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "Empacado",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
    {
      status: "Recibido en Miami",
      time: new Date().toLocaleString("es-DO", {
        hour12: true,
        timeZone: "UTC",
      }),
    },
  ];

  const paquetes: Package[] = [
    {
      category: "Electronicos",
      hasPreAlert: false,
      id: "WR91249825",
      status: getStatusByStatusId(1),
      statusId: 1,
      transportCompany: "USPS",
      weight: 0.42,
      date: new Date().toString(),
      total: 0.0,
      seller: "AMAZON",
      trackingId: "2337961026471014",
      articlesQuantity: 3,
      statusHistorial: historial,
    },
    {
      category: "Ropa",
      hasPreAlert: false,
      id: "WR912249825",
      status: getStatusByStatusId(7),
      statusId: 7,
      transportCompany: "FedEx",
      weight: 2.52,
      date: new Date().toString(),
      total: 0.0,
      seller: "SHEIN",
      trackingId: "54779610264710129",
      articlesQuantity: 3,
      statusHistorial: historial,
    },
    {
      category: "Cosmeticos",
      trackingId: "99179641026471074",
      hasPreAlert: false,
      id: "WR912249825",
      status: getStatusByStatusId(9),
      statusId: 9,
      transportCompany: "UPS",
      weight: 0.51,
      date: new Date().toString(),
      total: 184.5,
      seller: "EBAY",
      articlesQuantity: 3,
      statusHistorial: historial,
    },
  ];

  const [Packages, SetPackages] = useState<Package[]>(
    paquetes
      .filter((p) => p.statusId < 10)
      .sort((a, b) => a.statusId - b.statusId)
      .reverse()
  );

  const [RefreshingList, SetRefreshingList] = useState<boolean>(false);
  const RefreshPackagesList = () => {
    SetRefreshingList(false);
  };

  const [FilterStatus, SetFilterStatus] = useState<
    "todos" | "disponibles" | "pendientes"
  >("todos");

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top + 5,
        paddingHorizontal: screenPadding.horizontal - 5,
        gap: 5,
      }}
    >
      {/* <Redirect
        href={{
          pathname: "/package/details/[id]",
          params: { id: "WR91249825" },
        }}
      /> */}
      {/* <Redirect
        href={{
          pathname: "/(feed)/pre-alert",
          params: { id: "WR91249825" },
        }}
      /> */}
      <FeedInfoBanner />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Varela",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Paquetes pendientes
        </Text>

        <Pressable
          onPress={() => {
            router.push("/(feed)/my-packages");
          }}
          style={{
            height: 20,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Varela",
                fontSize: 15,
              }}
            >
              Ver todos
            </Text>
            <Ionicons name="chevron-forward" size={20} color={"black"} />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Chip
          role="button"
          selected={FilterStatus === "todos"}
          showSelectedCheck={false}
          mode="outlined"
          onPress={() => {
            SetPackages(
              paquetes
                .filter((p) => p.statusId < 10)
                .sort((a, b) => a.statusId - b.statusId)
                .reverse()
            );
            SetFilterStatus("todos");
          }}
          style={{
            margin: 5,
            flex: 1,
            borderRadius: 15,
            backgroundColor:
              FilterStatus === "todos" ? Colors.primary_orange : "white",
          }}
          selectedColor={
            FilterStatus === "todos" ? "white" : Colors.primary_orange
          }
          rippleColor={Colors.primary_orange}
          textStyle={{ fontFamily: "Varela", flex: 1, textAlign: "center" }}
        >
          Todos
        </Chip>

        <Chip
          role="button"
          selected={FilterStatus === "todos"}
          showSelectedCheck={false}
          mode="outlined"
          onPress={() => {
            SetPackages(paquetes.filter((p) => p.statusId == 9));
            SetFilterStatus("disponibles");
          }}
          style={{
            margin: 5,
            flex: 1,
            borderRadius: 15,
            backgroundColor: FilterStatus === "disponibles" ? "green" : "white",
          }}
          selectedColor={FilterStatus === "disponibles" ? "white" : "green"}
          rippleColor={"green"}
          textStyle={{ fontFamily: "Varela", flex: 1, textAlign: "center" }}
        >
          Disponibles
        </Chip>

        <Chip
          role="button"
          selected={FilterStatus === "todos"}
          showSelectedCheck={false}
          mode="outlined"
          onPress={() => {
            SetPackages(paquetes.filter((p) => p.statusId < 9));
            SetFilterStatus("pendientes");
          }}
          style={{
            margin: 5,
            flex: 1,
            borderRadius: 15,

            backgroundColor: FilterStatus === "pendientes" ? "red" : "white",
          }}
          selectedColor={FilterStatus === "pendientes" ? "white" : "red"}
          rippleColor={"red"}
          textStyle={{
            fontFamily: "Varela",
            flex: 1,
            textAlign: "center",
          }}
        >
          Pendientes
        </Chip>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={Packages}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={RefreshingList}
            onRefresh={() => {
              RefreshPackagesList();
            }}
          />
        }
        renderItem={({ item }: { item: Package }) => (
          <PackageItem key={item.id} packageItem={item} />
        )}
      />
    </View>
  );
}
