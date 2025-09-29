import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 30) / 2; // 2 columnas con margen

export default function PokemonItem({ name }: Props) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#2d3436",
    textAlign: "center",
  },
});
