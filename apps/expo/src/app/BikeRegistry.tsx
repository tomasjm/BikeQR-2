import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";


function BikeRegistry() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center pt-10">
        <TouchableOpacity
          className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
          onPress={() => router.push("ScannerBarCode")}
        >
          <Text>Escanear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BikeRegistry;
