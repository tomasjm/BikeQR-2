import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import usePusher from "~/hooks/usePusher";

const StartStorage = () => {
  const router = useRouter();
  const { data, type } = useLocalSearchParams();
  const [qr, setQR] = useState<string | undefined>();
  const [storageId, setStorageId] = useState<string>("");
  const validateCodeMutation = api.bike.validateCode.useMutation();
  const startStorageProcess = api.storage.startStorageProcess.useMutation();

  const { isSuccess, subscribe } = usePusher({
    channel: storageId,
    event: "START_STORAGE",
  });
  useEffect(() => {
    if (isSuccess) {
      alert("se completó el storage");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (qr) {
      subscribe();
    }
  }, [qr]);

  useEffect(() => {
    if (type == BarCodeScanner.Constants.BarCodeType.code128) {
      validateCodeMutation.mutate({ code: data as string });
    }
  }, [data]);

  useEffect(() => {
    if (validateCodeMutation.isSuccess) {
      if (Array.isArray(validateCodeMutation.data.data)) {
        const bike = validateCodeMutation.data.data[0];
        startStorageProcess.mutate({
          userId: bike.userId,
          bikeId: bike.id,
        });
      }
    }
  }, [validateCodeMutation.isSuccess]);

  useEffect(() => {
    if (startStorageProcess.isSuccess) {
      const data = startStorageProcess.data;
      if (data.error) {
        return alert(`Error!: ${data.msg}`);
      }
      const storage = startStorageProcess.data.storage;
      setStorageId(storage?.id as string);
      setQR(storage?.token.token as string);
    }
  }, [startStorageProcess.isSuccess]);

  return (
    <SafeAreaView className="flex-1 items-center gap-10 bg-white">
      <View className="flex-1 items-center">
        <Text className="p-8 px-3 text-base italic">
          Por favor, escanee el código de barra de la bicicleta.
        </Text>
        <Button
          text="Escanear"
          onPress={() =>
            router.push({
              pathname: "ScannerBarCode",
              params: { backPath: "StartStorage" },
            })
          }
        />

        {validateCodeMutation.isLoading && <Text>Validando código...</Text>}
        {startStorageProcess.isLoading && <Text>Generando QR...</Text>}
        {qr && (
          <View className="p-10">
            <View className="rounded-sm border p-3">
              <QRCode size={350} logoSize={60} value={qr} />
            </View>
            <Text className="items-center justify-center p-2 py-10 text-center text-base">
              Permita al usuario escanear el código QR mostrado en pantalla
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default StartStorage;
