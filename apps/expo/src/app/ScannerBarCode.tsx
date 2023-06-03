import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";

import Scanner from "~/components/Scanner";
import useScanner, { ScannerHook } from "~/hooks/useScanner";

function ScannerBarCode() {
  const {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
    error,
    data,
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

  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.replace({
        pathname: "BikeRegistry",
        params: { data },
      });
    }
  }, [data]);

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
