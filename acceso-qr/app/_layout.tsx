import { Slot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Slot />
    </SafeAreaProvider>
  );
}

