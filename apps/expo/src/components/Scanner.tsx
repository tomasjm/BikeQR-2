import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { type ScannerHook } from "../hooks/useScanner";

export default function Scanner({ args }: { args: ScannerHook }) {
  const {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
  } = args;
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <Text className="flex justify-center text-center text-lg text-red-700">
        Solicitando permisos para acceder a la cámara.
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <Text className="flex justify-center text-center text-lg text-red-700">
        Permiso para acceder a la cámara denegado.
      </Text>
    );
  }

  return (
    <View className="flex-1">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="mb-20 flex-1"
      />
      {scanned && (
        <View className="items-center p-2">
          <TouchableOpacity
            className="bg-yellow-000-color w-32 items-center rounded-md border p-2 text-base text-white"
            onPress={() => setScanned(false)}
          >
            <Text>Escanear de nuevo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
