import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "~/utils/api";
import Button from "~/components/Button";

export default function StoreBike() {
  const router = useRouter();
  const { data: dataQR, type } = useLocalSearchParams();
  const confirmStorage = api.storage.confirmStorage.useMutation();

  useEffect(() => {
    type == BarCodeScanner.Constants.BarCodeType.qr &&
      confirmStorage.mutate({ token: dataQR as string });
    type == BarCodeScanner.Constants.BarCodeType.code128 &&
      alert("El código escaneado no es un código QR");
  }, [dataQR]);

  useEffect(() => {
    if (confirmStorage.isSuccess) {
      const data = confirmStorage.data;
      const bikeId = data.data?.bike.code;
      const storeQr = async (token: string, codeBike: string) => {
        try {
          await AsyncStorage.setItem(`@${codeBike}`, token);
          alert("Se ha guardado la bicicleta");
          router.push("/");
        } catch (e) {
          alert(`Error al guardar la bicicleta: ${e}`);
        }
      };
      storeQr(dataQR as string, bikeId as string);
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
