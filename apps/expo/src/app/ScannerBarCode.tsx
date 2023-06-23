import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";

import Scanner from "~/components/Scanner";
import useScanner, { ScannerHook } from "~/hooks/useScanner";

function ScannerBarCode() {
  const router = useRouter()
  const { backPath } = useLocalSearchParams();

  const {
    scanned,
    type,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
    error,
    data,
  } = useScanner({
    type: [BarCodeScanner.Constants.BarCodeType.code128, BarCodeScanner.Constants.BarCodeType.qr],
  });
  const scannerProps: ScannerHook = {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
  };


  useEffect(() => {
    if (data) {
      router.replace({
        pathname: backPath as string,
        params: { data, type },
      });
    }
  }, [data]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Scanner args={scannerProps} />
      {error && (
        <View className="items-center p-2">
          <Text className="text-lg text-red-700">
            El código escaneado no es válido.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ScannerBarCode;
