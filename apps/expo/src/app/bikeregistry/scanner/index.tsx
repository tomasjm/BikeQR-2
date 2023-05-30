import React from "react";
import { Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import Scanner from "~/components/Scanner";
import useScanner, { type ScannerHook } from "~/hooks/useScanner";

function ScannerBarCode() {
  const {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
    error,
  } = useScanner({
    type: BarCodeScanner.Constants.BarCodeType.code128,
  });
  const scannerProps: ScannerHook = {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
  };

  return (
    <View style={{ flex: 1 }}>
      <Scanner args={scannerProps} />
      {error && (
        <View className="items-center p-2">
          <Text className="text-lg text-red-700">
            El código escaneado no es válido.
          </Text>
        </View>
      )}
    </View>
  );
}

export default ScannerBarCode;
