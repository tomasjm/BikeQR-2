import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";
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
    <SafeAreaView className="flex-1 items-center gap-10 bg-white p-4">
      <Text className="text-2xl">Ingresar bicicleta</Text>
      <TouchableOpacity
        className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
        onPress={() =>
          router.push({
            pathname: "ScannerBarCode",
            params: { backPath: "StartStorage" },
          })
        }
      >
        <Text>Ingresar bicicleta</Text>
      </TouchableOpacity>
      {validateCodeMutation.isLoading && <Text>Validando código...</Text>}
      {startStorageProcess.isLoading && <Text>Generando QR...</Text>}
      {qr && (
        <View className="p-10">
          <QRCode size={350} logoSize={60} value={qr} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default StartStorage;
