import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface Props {
  value: string;
}

export default function QRCodeDisplay({ value }: Props) {
  return (
    <View style={{ marginVertical: 20 }}>
      <QRCode value={value || " "} size={200} />
    </View>
  );
}

