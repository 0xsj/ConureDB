// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";
import React from "react";
import { TRPCProvider } from "./utils/trpc";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./theme/dark";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

function NavStack() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

function AppInner(): JSX.Element {
  return <NavStack />;
}

export const App = () => {
  const isDarkMode = false;
  return (
    <SafeAreaProvider>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <TRPCProvider>
          <ThemeProvider theme={theme}>
            <StatusBar
              barStyle={isDarkMode ? "dark-content" : "light-content"}
            />
            <AppInner />
          </ThemeProvider>
        </TRPCProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
};

export default App;
