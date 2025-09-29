import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import QRCodeDisplay from "../components/QRGenerator";

export default function HomeScreen() {
  const [text, setText] = useState("Hola QR");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Texto a codificar:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese texto..."
        value={text}
        onChangeText={setText}
      />

      <QRCodeDisplay value={text} />

      <Button title="Escanear QR" onPress={() => router.push("/scanner")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
