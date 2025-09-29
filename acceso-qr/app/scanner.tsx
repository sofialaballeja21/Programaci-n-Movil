import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { Barcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  // Obtener dispositivos de cámara
  const devices = useCameraDevices();
  const device = devices.back ?? devices.front; // fallback por si no hay trasera
  const cameraRef = useRef<Camera>(null);

  // Pedir permisos de cámara
  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission.status === 'authorized');
    })();
  }, []);

  // Función para manejar códigos QR escaneados
  const handleBarcodes = useCallback((barcodes: Barcode[]) => {
    if (barcodes.length > 0 && !scanned) {
      const data = barcodes[0].displayValue;
      if (data) {
        setScanned(true);
        setScannedData(data);
        Alert.alert('QR Escaneado', data);
      }
    }
  }, [scanned]);

  // Frame processor para escanear QR
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    if (barcodes.length > 0) {
      runOnJS(handleBarcodes)(barcodes);
    }
  }, [handleBarcodes]);

  if (hasPermission === null) return <Text>Solicitando permisos...</Text>;
  if (hasPermission === false)
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>No hay permisos de cámara</Text>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    );

  if (!device) return <Text>Cargando cámara...</Text>;

  return (
    <View style={styles.container}>
      {!scanned && (
        <Camera
          style={StyleSheet.absoluteFillObject}
          device={device}
          isActive={true}
          ref={cameraRef}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      )}

      <View style={styles.overlay}>
        <Text style={styles.text}>{scannedData || 'Escanea un QR'}</Text>

        {scannedData && (
          <Button
            title="Copiar al portapapeles"
            onPress={() => Clipboard.setStringAsync(scannedData)}
          />
        )}

        <Button
          title={scanned ? 'Escanear nuevamente' : 'Cancelar'}
          onPress={() => {
            if (scanned) setScanned(false);
            else router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  text: { color: '#fff', marginBottom: 10 },
});
