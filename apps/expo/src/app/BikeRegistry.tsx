import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

function BikeRegistry() {
  const router = useRouter();
  const { data } = useSearchParams();
  const validation = api.bike.validateCode.useQuery({
    code: parseInt(data as string),
  });
  return (
    <View className="flex-1">
      <View className="flex-1 items-center pt-10">
        <TouchableOpacity
          className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
          onPress={() =>
            router.push({
              pathname: "ScannerBarCode",
            })
          }
        >
          <Text>Escanear</Text>
        </TouchableOpacity>
      </View>

      {validation && (
        <View className="flex-1 items-center pt-10">
          <Text className="font-semibold">{String(data)}</Text>
        </View>
      )}
    </View>
  );
}

export default BikeRegistry;
