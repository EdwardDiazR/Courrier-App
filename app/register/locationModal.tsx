import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { colors, fontSize, screenPadding } from "@/constants/constants";
import * as Location from "expo-location";
import axios from "axios";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import * as SMS from "expo-sms";

export default function locationModal() {
  const isPresented = router.canGoBack();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [AddressName, SetAddressName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [Loading, SetLoading] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    console.log("presented modal");
  }, [isPresented]);

  useEffect(() => {}, []);

  async function GetLocation() {
    SetLoading(true);
    SetAddressName("");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({})
      .then((location) => {
        setLocation(location);

        if (location) {
          getAddressName(location);
          console.log(location.coords);
        } else {
          Alert.alert("Error", "Ha ocurrido un error obteniendo tu ubicacion");
          SetLoading(false);
        }
      })
      .catch((e) => {
        Alert.alert(
          "Error",
          "No hemos podido obtener tu ubicacion, intentalo nuevamente"
        );
        SetLoading(false);
      });
  }

  async function getAddressName(location: Location.LocationObject) {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&format=json`
      )
      .then((res) => {
        console.log(res.data.display_name);
        SetAddressName(res.data.display_name);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        SetLoading(false);
      });
  }

  return (
    <View
      style={{
        paddingTop: top + 5,
        paddingHorizontal: screenPadding.horizontal,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          backgroundColor: "white",
          paddingVertical: 10,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            zIndex: 999,
          }}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="chevron-back" size={25} />
        </Pressable>
        <Text
          style={{
            fontSize: fontSize.lg,
            fontFamily: "Varela",
            textAlign: "center",
            flex: 1,
          }}
        >
          Obtener ubicacion
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 15,
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <Feather
          name="map-pin"
          size={100}
          color={Colors.primary_orange}
          style={{ alignSelf: "center", marginVertical: 20 }}
        />

        <TextInput
          multiline
          value={AddressName}
          placeholder="Esperando tu direccion..."
          readOnly
          style={{
            backgroundColor: colors.lightgray_background,
            borderRadius: 5,
            elevation: 0.5,
            padding: 10,
            minHeight: 50,
            color: "black",
          }}
        />

        {Loading && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color={Colors.primary_orange} />
          </View>
        )}

        {AddressName && !Loading && (
          <View style={{ gap: 10 }}>
            <Link
              style={{
                backgroundColor: colors.success_green,

                borderRadius: 10,
                elevation: 1,
                textAlign: "center",
                textAlignVertical: "center",
                height: 45,
              }}
              href={{
                pathname: "./",
                params: { address: AddressName },
              }}
            >
              <View
                style={{
                  flex: 1,
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Varela",
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Confirmar direccion
                </Text>
                <FontAwesome name="check" size={20} color={"white"} />
              </View>
            </Link>
            <TouchableOpacity
              style={{
                backgroundColor: "lightgray",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                height: 45,
              }}
              onPress={GetLocation}
            >
              <View
                style={{
                  gap: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Varela",
                    color: "black",
                    fontSize: 15,
                  }}
                >
                  Intentarlo de nuevo
                </Text>
                <FontAwesome name="repeat" size={20} color={"black"} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {!Loading && !AddressName && (
          <TouchableOpacity
            onPress={() => {
              GetLocation();
            }}
            style={{
              backgroundColor: Colors.primary_orange,
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              elevation: 1,
            }}
          >
            <Text
              style={{ fontFamily: "Varela", color: "white", fontSize: 15 }}
            >
              Obtener ubicacion
            </Text>
          </TouchableOpacity>
        )}

        <Link
          href={"./"}
          style={{
            textAlign: "center",
            color: Colors.primary_orange,
            fontFamily: "Varela",
            textDecorationLine: "underline",
            fontWeight: "600",
          }}
        >
          Ingresar mi direccion manualmente
        </Link>
      </View>
    </View>
  );
}
