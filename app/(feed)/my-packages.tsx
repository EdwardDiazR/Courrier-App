import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/constants/Colors";
import { Chip } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Package, StatusHistorial } from "@/models/Package";
import PackageItem from "@/components/package/PackageItem";
import { screenPadding } from "@/constants/constants";

export default function myPackages() {
  const { top } = useSafeAreaInsets();
  const [DaysToFilter, SetDaysToFilter] = useState<number>(30);

  const pickerRef = useRef();

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
      weight: 1.42,
      date: new Date().toString(),
      total: 0.0,
      seller: "AMAZON",
      trackingId: "1737961026471074",
      articlesQuantity: 2,
      statusHistorial: historial,
    },
    {
      category: "Ropa",
      hasPreAlert: false,
      id: "WR9122349825",
      status: getStatusByStatusId(1),
      statusId: 1,
      transportCompany: "FedEx",
      weight: 1.42,
      date: new Date().toString(),
      total: 0.0,
      seller: "AMAZON",
      trackingId: "1737961026471074",
      articlesQuantity: 2,
      statusHistorial: historial,
    },
    {
      category: "Cosmeticos",
      hasPreAlert: false,
      id: "WR912F249825",
      status: getStatusByStatusId(1),
      statusId: 1,
      transportCompany: "UPS",
      weight: 1.42,
      date: new Date().toString(),
      total: 0.0,
      seller: "AMAZON",
      trackingId: "1737961026471074",
      articlesQuantity: 2,
      statusHistorial: historial,
    },
  ];

  const filterPackagesByDays = (days: number) => {
    if (DaysToFilter != days) {
      SetDaysToFilter(days);
      //TODO: Filter the list of packages to show only packages within days selected
    }
  };

  return (
    <View
      style={{
        paddingTop: top,
        paddingHorizontal: screenPadding.horizontal,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 22, fontFamily: "Varela" }}>Mis paquetes</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Chip
          role="button"
          selected={DaysToFilter === 30}
          showSelectedCheck={false}
          mode="outlined"
          onPress={() => {
            filterPackagesByDays(30);
          }}
          style={{
            margin: 5,
            borderRadius: 15,
            backgroundColor:
              DaysToFilter === 30 ? Colors.primary_orange : "lightgray",
          }}
          selectedColor={"white"}
        >
          <Text style={{ fontFamily: "Varela" }}>30 dias</Text>
        </Chip>

        <Chip
          role="button"
          onPress={() => filterPackagesByDays(60)}
          showSelectedCheck={false}
          style={{
            margin: 5,
            borderRadius: 15,
            backgroundColor:
              DaysToFilter === 60 ? Colors.primary_orange : "lightgray",
          }}
          selectedColor={"white"}
        >
          <Text style={{ fontFamily: "Varela" }}>60 dias</Text>
        </Chip>

        <Chip
          role="button"
          onPress={() => filterPackagesByDays(90)}
          showSelectedCheck={false}
          style={{
            margin: 5,
            borderRadius: 15,
            backgroundColor:
              DaysToFilter === 90 ? Colors.primary_orange : "lightgray",
          }}
          selectedColor={"white"}
        >
          <Text style={{ fontFamily: "Varela" }}>90 dias</Text>
        </Chip>

        <Chip
          role="button"
          onPress={() => filterPackagesByDays(-1)}
          showSelectedCheck={false}
          style={{
            margin: 5,
            borderRadius: 15,
            backgroundColor:
              DaysToFilter === -1 ? Colors.primary_orange : "lightgray",
          }}
          selectedColor={"white"}
        >
          <Text style={{ fontFamily: "Varela" }}>Historico</Text>
        </Chip>
      </View>
      <FlatList
        data={paquetes}
        renderItem={({ item }: { item: Package }) => (
          <PackageItem key={item.id} packageItem={item} />
        )}
      />
    </View>
  );
}
