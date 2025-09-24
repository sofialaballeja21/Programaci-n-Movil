//Maneja la navegación

import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Conferencias" }} />
      <Stack.Screen name="detail" options={{ title: "Detalle" }} />
      <Stack.Screen name="map" options={{ title: "Mapa" }} />
    </Stack>
  );
}


