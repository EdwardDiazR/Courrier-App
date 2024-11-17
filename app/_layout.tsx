import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetProvider, {
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Varela: require("../assets/fonts/VarelaRound-Regular.ttf"),
    Signika: require("../assets/fonts/Signika-Regular.ttf"),
    SignikaSemiBold: require("../assets/fonts/Signika-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{ headerShown: false, animation: "ios" }}
            initialRouteName="auth"
          >
            <Stack.Screen name="auth" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(feed)" options={{}} />
            <Stack.Screen name="package" options={{ title: "Detalles" }} />
          </Stack>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
