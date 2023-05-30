import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import BikeList from "~/components/BikeList";
import ScannerBarCode from "./scanner";

function Index() {
  const [state, setState] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="bg-beige-000-color w-full items-center">
        <Text className="text-xl font-semibold">Registro de Bicicletas</Text>
      </View>

      {!state && (
        <View className="flex-1 items-center pt-10">
          <TouchableOpacity
            className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
            onPress={() => router.push("bikeregistry/scanner")}
          >
            <Text>Escanear</Text>
          </TouchableOpacity>
        </View>
      )}
      {state && (
        <>
          <View className="flex-1 ">
            <ScannerBarCode />
          </View>
          <View className="items-center pb-40">
            <TouchableOpacity
              className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
              onPress={() => setState(false)}
            >
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default Index;
