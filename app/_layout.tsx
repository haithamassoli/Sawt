import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ReThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@zustand/store";
import RNRestart from "react-native-restart";
import { useFonts } from "expo-font";
import { FlashList } from "@shopify/flash-list";
import {
  PaperProvider,
  MD3LightTheme,
  TextInput,
  configureFonts,
  Text,
} from "react-native-paper";
import { useCallback, useEffect } from "react";
import { MaterialDark, MaterialLight, fontConfig } from "@styles/material";
import { ThemeProvider } from "@react-navigation/native";
import theme, { Box, ReText, darkTheme } from "@styles/theme";
import Colors from "@styles/colors";
import { I18nManager, Platform, ScrollView, UIManager } from "react-native";
import {
  Stack,
  SplashScreen,
  useSegments,
  router,
  useRootNavigationState,
} from "expo-router";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";
import { deleteAllStorage, getDataFromStorage } from "@utils/helper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

const getTheme = async () => {
  const darkMode = await getDataFromStorage("isDark");
  if (darkMode === null) {
    useStore.setState({ isDark: false });
  } else {
    useStore.setState({ isDark: darkMode });
  }
};

const getUserFromStorage = async () => {
  const user = await getDataFromStorage("user");
  if (user) useStore.setState({ user });
};

export default function RootLayout() {
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  ReText.defaultProps = ReText.defaultProps || {};
  ReText.defaultProps.allowFontScaling = false;

  ScrollView.defaultProps = ScrollView.defaultProps || {};
  ScrollView.defaultProps.showsVerticalScrollIndicator = false;
  ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

  FlashList.defaultProps = FlashList.defaultProps || {};
  FlashList.defaultProps.showsVerticalScrollIndicator = false;
  FlashList.defaultProps.showsHorizontalScrollIndicator = false;

  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const { isDark, user } = useStore();

  const forceRTL = () => {
    if (!I18nManager.isRTL) {
      try {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        RNRestart.restart();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    forceRTL();
    getUserFromStorage();
    getTheme();
    // deleteAllStorage();
  }, []);

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    const inAuthGroup = segments.includes("(drawer)");
    // const inAuthGroup = segments.includes("(as)");
    if (!user && inAuthGroup) {
      router.replace("/on-boarding");
    } else if (
      user &&
      (segments[0] === "(auth)" || segments[0] === "on-boarding")
    ) {
      router.replace("/");
    }
    console.log(segments);
  }, [user, segments, rootNavigationState]);

  const [fontsLoaded] = useFonts({
    CairoReg: require("@assets/fonts/Cairo-Reg.ttf"),
    CairoBold: require("@assets/fonts/Cairo-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const materialTheme: any = {
    ...MD3LightTheme,
    dark: isDark,
    isV3: true,
    version: 3,
    colors: isDark
      ? { ...MD3LightTheme.colors, ...MaterialDark }
      : { ...MD3LightTheme.colors, ...MaterialLight },
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReThemeProvider theme={isDark ? darkTheme : theme}>
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={
            isDark ? Colors.darkBackground : Colors.lightBackground
          }
        />
        <PaperProvider theme={materialTheme}>
          <ThemeProvider
            value={isDark ? DarkNavigationColors : LightNavigationColors}
          >
            <Box flex={1} onLayout={onLayoutRootView}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "slide_from_left",
                }}
              >
                <Stack.Screen name="on-boarding" />
                <Stack.Screen name="(auth)/sign-in" />
                <Stack.Screen name="(auth)/sign-up" />
                <Stack.Screen name="(auth)/verification" />
              </Stack>
            </Box>
          </ThemeProvider>
        </PaperProvider>
      </ReThemeProvider>
    </QueryClientProvider>
  );
}
