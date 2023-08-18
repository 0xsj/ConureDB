import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SupabaseProvider } from "@/context/SupabaseProvider"; // Make sure to adjust the path

export default function Root() {
  return (
    <SupabaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </SupabaseProvider>
  );
}
