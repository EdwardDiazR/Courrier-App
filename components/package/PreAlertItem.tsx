import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { PreAlert } from "@/models/Package";
import { colors } from "@/constants/constants";
import { Colors } from "@/constants/Colors";
import { Divider } from "react-native-paper";

const PreAlertItem = ({ PreAlertItem }: { PreAlertItem: PreAlert }) => {
  return (
    <View
      style={{
        borderRadius: 7,
        backgroundColor: colors.lightgray_background,
        marginVertical: 6,
        padding: 10,
        borderWidth: 1,
        elevation: 2,
        borderColor: Colors.primary_orange,
        gap: 5,
      }}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[Syles.text]}>
            Fecha:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {PreAlertItem.created_at}
            </Text>
          </Text>

          <Text style={[Syles.text]}>
            Valor:{" "}
            <Text style={{ fontWeight: "bold" }}>${PreAlertItem.fobUSD}</Text>
          </Text>
        </View>
        <Divider bold style={{ borderWidth: 0.2, borderColor: "lightgray" }} />

        <Text style={[Syles.text]}>
          Articulo:{" "}
          <Text style={{ fontWeight: "bold" }}>{PreAlertItem.article} </Text>
        </Text>
        <Text style={[Syles.text]}>
          Suplidor:{" "}
          <Text style={{ fontWeight: "bold" }}>{PreAlertItem.supplier}</Text>
        </Text>

        <Text style={[Syles.text]}>
          # Tracking:{" "}
          <Text style={{ fontWeight: "bold" }}>{PreAlertItem.tracking}</Text> |{" "}
          <Text style={{ fontWeight: "bold" }}>
            {PreAlertItem.transportist}
          </Text>
        </Text>

        <Text style={[Syles.text]}>
          Fecha recepcion: {PreAlertItem.receptionDate}
        </Text>
      </View>

      <View>
        <Pressable
          style={{
            backgroundColor: Colors.secondary_orange,
            padding: 5,
            borderRadius: 7,
            elevation: 1,
          }}
        >
          <Text style={[Syles.text, { color: "white", textAlign: "center" }]}>
            Hacer seguimiento
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Syles = StyleSheet.create({
  text: {
    fontFamily: "Varela",
    fontSize: 14,
  },
});
export { PreAlertItem };
