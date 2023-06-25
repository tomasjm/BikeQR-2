import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";
import Button from "~/components/Button";

export default function StoreBike() {
  const router = useRouter();
  const { data, type } = useLocalSearchParams();
  const confirmStorage = api.storage.confirmStorage.useMutation();

  useEffect(() => {
    type == BarCodeScanner.Constants.BarCodeType.qr &&
      confirmStorage.mutate({ token: data as string });
    type == BarCodeScanner.Constants.BarCodeType.code128 &&
      alert("El código escaneado no es un código QR");
  }, [data]);

  useEffect(() => {
    if (confirmStorage.isSuccess) {
      alert("Se guardó exitosamente la bicicleta.");
      if (Array.isArray(confirmStorage.data)) {
        const bike = confirmStorage.data[0];
        console.log("Your bike has been stored, this one is your bike:", bike);
      }
    }
    confirmStorage.isError && alert("Error al confirmar el guardado");
  }, [confirmStorage.isSuccess]);

  return (
    <SafeAreaView className="flex-1 items-center gap-10 bg-white">
      <View className="flex-1 items-center">
        <Text className="p-10 text-base italic">
          Por favor, para confirmar el guardado escanee el código QR en la
          pantalla del encargado
        </Text>
        <Button
          text="Escanear"
          onPress={() =>
            router.push({
              pathname: "ScannerBarCode",
              params: { backPath: "StoreBike" },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
