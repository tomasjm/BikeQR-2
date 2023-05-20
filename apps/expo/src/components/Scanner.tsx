import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { ScannerHook } from "~/app/hooks/useScanner";

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
    <View className="items-center">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        className="h-96 w-screen"
      />

      {scanned && (
        <TouchableOpacity
          className="w-36 items-center rounded-xl border-white bg-blue-500"
          onPress={() => setScanned(false)}
        >
          <Text className="text-center text-lg text-white">
            Escanear de nuevo
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
