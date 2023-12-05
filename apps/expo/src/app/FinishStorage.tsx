import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import { bikeAtom } from "~/atoms";
import usePusher from "~/hooks/usePusher";

const Index = () => {
  const router = useRouter();
  const [bike, setBike] = useAtom(bikeAtom);
  const { data, type } = useLocalSearchParams();
  const [storageId, setStorageId] = useState<string>("");
  const { isSuccess, subscribe } = usePusher({
    channel: storageId,
    event: "FINISH_STORAGE",
  });
  const finishStorageMutation = api.storage.finishStorageProcess.useMutation();
  useEffect(() => {
    if (type == BarCodeScanner.Constants.BarCodeType.qr) {
      const token = data as string;
      const bikeCode = bike;
      finishStorageMutation.mutate({ token, bikeCode });
    }
    if (type == BarCodeScanner.Constants.BarCodeType.code128) {
      setBike(data as string);
    }
  }, [type]);
  console.log(finishStorageMutation.status);
  useEffect(() => {
    if (finishStorageMutation.isSuccess) {
      alert("Se ha iniciado el proceso de finalización de retiro");
      const data = finishStorageMutation.data;
      if (data.error) {
        return alert(`Error!: ${data.msg}`);
      }
      const storage = data.data?.storage;
      setStorageId(storage?.id as string);
    }
  }, [finishStorageMutation.isSuccess]);

  useEffect(() => {
    if (storageId.length > 0) {
      subscribe();
    }
  }, [storageId]);

  useEffect(() => {
    if (isSuccess) {
      alert("Se completó el proceso de retiro exitosamente");
    }
  }, [isSuccess]);

  useEffect(() => {
    setBike("");
  }, []);
  console.log(bike);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {bike ? (
        <View className="items-center justify-center gap-4">
          <Text className="text-center text-base font-semibold">
            Por favor, escanee el código QR que se encuentra en la pantalla del
            usuario.
          </Text>
          <Button
            text="Escanear QR"
            onPress={() =>
              router.push({
                pathname: "ScannerBarCode",
                params: { backPath: "FinishStorage" },
              })
            }
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {finishStorageMutation.isLoading && <ActivityIndicator />}
          </View>
        </View>
      ) : (
        <View className="flex-1 ">
          <View className=" items-center  gap-3 ">
            <Text className="items-center text-center ">
              Por favor, escanee el código de barras de la bicicleta.
            </Text>
            <Button
              text="Escanear"
              onPress={() =>
                router.push({
                  pathname: "ScannerBarCode",
                  params: { backPath: "FinishStorage" },
                })
              }
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Index;
