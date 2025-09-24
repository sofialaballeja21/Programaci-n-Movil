import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ConferenceCard from "../src/components/ConferenceCard";
import { getConferences, seedConferences } from "../src/db/database";
import { Conference } from "../src/types/Conference";

export default function HomeScreen() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await seedConferences(); // Cargar datos iniciales si DB está vacía
      const data = await getConferences();
      setConferences(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={conferences}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConferenceCard
            conference={item}
            onPress={() => router.push({ pathname: "/detail", params: { id: item.id.toString() } })}
          />
        )}
      />
    </View>
  );
}
