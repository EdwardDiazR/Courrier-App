import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Href, Redirect, router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors, fontSize, textInputStyle } from "@/constants/constants";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import Animated, {
  BounceIn,
  BounceInUp,
  FadeIn,
  FadeInLeft,
  FlipInEasyY,
  ReduceMotion,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  StretchInX,
  StretchInY,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  ZoomIn,
} from "react-native-reanimated";

export default function login() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const BorderRadius = 12;

  const [IsLogging, SetIsLogging] = useState<boolean>(false);
  const [IsRememberChecked, SetIsRememberChecked] = useState<boolean>(false);

  const OpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer);
  };

  useEffect(() => {}, []);

  const appearText = () => {};

  const duration = 5000;
  const easing = Easing.bezier(0.3, 0.3, 0.3, 0.3);
  const sv = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  const startSpinnerAnimation = () => {
    sv.value = 0;
    sv.value = withRepeat(withTiming(4, { duration, easing }), -1);
  };

  const login = () => {
    SetIsLogging(true);
    startSpinnerAnimation();
    setTimeout(() => {
      SetIsLogging(false);
      router.push("/(feed)/");
    }, 2000);
  };

  const handleRememberUserToggle = () => {
    SetIsRememberChecked(!IsRememberChecked);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        justifyContent: "center",
        gap: 10,
        backgroundColor: Colors.primary_orange,
      }}
    >
      <Pressable
        onPress={OpenDrawer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: top + 15,
          marginLeft: 10,
        }}
      >
        <Ionicons name="menu" size={30} color={"white"} />
      </Pressable>
      
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            backgroundColor: colors.white_snow,
            borderRadius: 10,
            margin: 20,
            alignItems: "center",
            elevation: 2,
          }}
        >
          <Animated.View
            entering={FadeIn.duration(600)}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
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
              MyPack
            </Text>
          </Animated.View>
        </View>
        <View
          style={{
            backgroundColor: colors.white_snow,
            padding: 10,
            paddingHorizontal: 15,
            borderTopLeftRadius: BorderRadius / 3,
            borderTopRightRadius: BorderRadius / 3,
            borderBottomRightRadius: BorderRadius,
            borderBottomLeftRadius: BorderRadius,
            gap: 10,
          }}
        >
          <View style={{ gap: 3 }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                textAlign: "center",
                marginVertical: 5,
                fontFamily: "Signika",
                fontWeight: "condensedBold",
              }}
            >
              Iniciar sesion
            </Text>
            <View style={[Styles.SectionContainer, { gap: 5 }]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <FontAwesome5 name="user-circle" size={18} />
                <Text style={{ fontFamily: "Varela" }}>Usuario</Text>
              </View>
              <TextInput
                style={[Styles.InputStyle]}
                placeholder="Correo o codigo de cliente"
              />
            </View>
            <View style={[Styles.SectionContainer, { gap: 5 }]}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <MaterialIcons name="lock-outline" size={17} />
                <Text style={{ fontFamily: "Varela" }}>Contraseña</Text>
              </View>
              <TextInput
                style={[Styles.InputStyle]}
                placeholder="Contraseña"
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
                // onFocus={}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                status={IsRememberChecked ? "checked" : "unchecked"}
                color={Colors.primary_orange}
                uncheckedColor={"lightgray"}
                onPress={handleRememberUserToggle}
                disabled={IsLogging}
                theme={{
                  roundness: 10,
                  mode: "exact",
                  colors: { disabled: "red", shadow: "red" },
                }}
              />
              <Text style={{ fontFamily: "Varela", color: "black" }}>
                Recordarme
              </Text>
            </View>
          </View>

          <View>
            <Pressable
              style={[
                Styles.Button,
                { backgroundColor: Colors.secondary_orange },
              ]}
              disabled={IsLogging}
              onPress={() => {
                login();
              }}
            >
              {!IsLogging ? (
                <Text
                  style={{
                    fontFamily: "Varela",
                    color: "white",
                    fontSize: fontSize.sm,
                    fontWeight: "condensedBold",
                  }}
                >
                  Iniciar sesion
                </Text>
              ) : (
                <Animated.View style={[animatedStyle]}>
                  <Feather name="package" size={20} color={"white"} />
                  {/* <ActivityIndicator color="white" size={20} /> */}
                </Animated.View>
              )}
            </Pressable>

            <Pressable
              style={[
                Styles.Button,
                { backgroundColor: colors.lightgray_background },
              ]}
              android_ripple={{
                color: Colors.primary_orange,
                foreground: true,
              }}
              onPress={() => {
                router.push("/register");
              }}
              disabled={IsLogging}
            >
              <Text
                style={{
                  fontFamily: "Varela",
                  color: "black",
                  fontSize: fontSize.sm,
                  fontWeight: "condensedBold",
                }}
              >
                Registrate
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  SectionContainer: {
    marginVertical: 1.5,
  },

  Button: {
    marginVertical: 4,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    padding: 5,
  },
  InputStyle: {
    height: textInputStyle.height,
    borderRadius: 5,
    borderWidth: 0,
    padding: 10,
    paddingRight: 10,
    fontFamily: "Varela",
    backgroundColor: colors.lightgray_background,
    fontSize: 14,
    cursor: "auto",
    color: "black",
  },
});
