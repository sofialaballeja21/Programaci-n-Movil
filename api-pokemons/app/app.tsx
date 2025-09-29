import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PokemonListScreen from "../sreens/PokemonListScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <PokemonListScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
