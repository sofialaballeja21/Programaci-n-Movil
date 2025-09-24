import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getConferenceById } from "../src/db/database";
import { Conference } from "../src/types/Conference";
import { images } from "../src/utils/images";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [conference, setConference] = useState<Conference | null>(null);

useEffect(() => {
  const loadConference = async () => {
    if (id) {
      const conf = await getConferenceById(parseInt(id)); 
      setConference(conf);
    }
  };
  loadConference();
}, [id]);

  if (!conference) {
    return (
      <View style={styles.center}>
        <Text>Cargando conferencia...</Text>
      </View>
    );
  }

  // 👇 resolvemos la imagen desde el diccionario
  const imgSource = conference.image ? images[conference.image] : null;

  return (
    <ScrollView style={styles.container}>
      {imgSource && (
        <Image source={imgSource} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.title}>{conference.title}</Text>
      <Text style={styles.speaker}>Disertante: {conference.speaker}</Text>
      <Text style={styles.time}>
        Horario: {conference.startTime} - {conference.endTime}
      </Text>

      <Text style={styles.section}>Ubicación</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -32.4846, // Concepción del Uruguay
          longitude: -58.2322,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: -32.4846, longitude: -58.2322 }}
          title="Conferencia"
          description={conference.title}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  speaker: { fontSize: 16, marginBottom: 4 },
  time: { fontSize: 16, marginBottom: 16 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 8 },
  map: { width: "100%", height: 200, borderRadius: 12 },
});
