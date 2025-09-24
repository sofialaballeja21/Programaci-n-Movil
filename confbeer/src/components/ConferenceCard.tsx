import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Conference } from "../types/Conference";
import { images } from "../utils/images";


type Props = {
  conference: Conference;
  onPress: () => void;
};
export default function ConferenceCard({ conference, onPress }: Props) {
  const imgSource = conference.image ? images[conference.image] : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imgSource ? (
        <Image source={imgSource} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={{ color: "#999" }}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {conference.title}
        </Text>
        <Text style={styles.time}>
          {conference.startTime} - {conference.endTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 120 },
  placeholder: { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
  info: { padding: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
  time: { fontSize: 14, color: "#555" },
});

