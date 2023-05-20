import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Scanner from "~/components/Scanner";
import useScanner, { ScannerHook } from "./hooks/useScanner";

const Index = () => {
  const [state, setState] = useState(false);
  const {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
  } = useScanner();
  const scannerProps: ScannerHook = {
    scanned,
    hasPermission,
    setHasPermission,
    setScanned,
    handleBarCodeScanned,
  };

  return (
    <View className="flex h-full items-center p-10 ">
      {!state && (
        <TouchableOpacity
          className="w-32 items-center rounded-md bg-blue-500 p-2 text-base text-white"
          onPress={() => setState(true)}
        >
          <Text>Click me</Text>
        </TouchableOpacity>
      )}
      {state && (
        <View className="flex items-center gap-2">
          <Scanner args={scannerProps} />
          <TouchableOpacity
            className="w-32 items-center rounded-md bg-blue-500 p-2 text-base text-white"
            onPress={() => setState(false)}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Index;
