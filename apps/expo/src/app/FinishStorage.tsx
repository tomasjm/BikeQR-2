import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { BarCodeScanner } from "expo-barcode-scanner";
import { bikeAtom, scannedDataAtom, ScannedData } from "~/atoms";
import { useAtom } from "jotai";
import { api } from "~/utils/api";

const Index = () => {
  const router = useRouter();
  const [bike, setBike] = useAtom(bikeAtom);
  const [scannedData, setScannedData] = useAtom(scannedDataAtom);

  const { data, type } = useLocalSearchParams()


  const finishStorageMutation = api.storage.finishStorageProcess.useMutation()

  useEffect(() => {
    if (type == BarCodeScanner.Constants.BarCodeType.qr) {
      console.log("finish")
      setScannedData({ data, type } as ScannedData)
      const token = data as string;
      const bikeCode = bike as string;
      finishStorageMutation.mutate({ token, bikeCode })

    }
    if (type == BarCodeScanner.Constants.BarCodeType.code128) {
      console.log("se ha leido bicicleta", data)
      setBike(data as string);
      setScannedData({ data, type } as ScannedData)
    }
  }, [type])

  useEffect(() => {
    if (finishStorageMutation.isSuccess) {
      alert("se ha finalizado")
    }
  }, [finishStorageMutation.isSuccess])

  return (
    <SafeAreaView className="flex-1 items-center gap-10 bg-white p-4">
      {bike ? (
        <>
          <TouchableOpacity
            className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
            onPress={() => router.push({ pathname: "ScannerBarCode", params: { backPath: "FinishStorage" } })}
          >
            <Text>Finish storage reading QR</Text>
          </TouchableOpacity>
          <>
            {finishStorageMutation.isLoading && <ActivityIndicator />}
          </>
        </>
      ) : (
        <TouchableOpacity
          className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
          onPress={() => router.push({ pathname: "ScannerBarCode", params: { backPath: "FinishStorage" } })}
        >
          <Text>Read code128</Text>
        </TouchableOpacity>

      )}
    </SafeAreaView>
  );
};

export default Index;
