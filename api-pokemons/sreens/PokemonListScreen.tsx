import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import PokemonItem from "../components/PokemonItems";
import usePokemon, { Pokemon } from "../hooks/usePokemons";

export default function PokemonListScreen() {
  const { data, loading, error, refreshing, onRefresh } = usePokemon();
  const [query, setQuery] = useState<string>("");

  // Filtro optimizado
  const filteredData = useMemo(() => {
    return data.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff4757" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Text style={styles.subText}>Desliza hacia abajo para reintentar</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Pokemon> = ({ item }) => (
    <PokemonItem name={item.name} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Pokédex</Text>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.input}
          placeholder="Buscar Pokémon..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Lista en 2 columnas */}
      {filteredData.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>😢 No hay resultados</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#2d3436",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  error: { color: "red", fontSize: 16, fontWeight: "600" },
  subText: { fontSize: 14, color: "#555", marginTop: 5 },
  empty: { fontSize: 18, color: "#636e72", fontWeight: "500" },
  row: { justifyContent: "space-between" },
});
