import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter, useSearchParams } from "expo-router";

import { api } from "~/utils/api";

function Storage() {
  const router = useRouter();
  const { data } = useSearchParams();
  const mutationValidation = api.bike.validateCode.useMutation();

  React.useEffect(() => {
    if (data) {
      if (Array.isArray(data) && typeof data[0] == "string") {
        mutationValidation.mutate({ code: data[0] });
      } else if (typeof data == "string") {
        mutationValidation.mutate({ code: data });
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (mutationValidation.isSuccess) {
      console.log(mutationValidation.data);
    }
  }, [mutationValidation.isSuccess]);
  return (
    <View className="flex-1">
      <View className="flex-1 items-center pt-10">
        <TouchableOpacity
          className="bg-green-000-color w-32 items-center rounded-md border p-2 text-base text-white"
          onPress={() =>
            router.push({
              pathname: "ScannerBarCode",
            })
          }
        >
          <Text>Escanear</Text>
        </TouchableOpacity>
      </View>

      {mutationValidation.isSuccess && mutationValidation.data && (
        <View className="flex-1 items-center pt-10">
          <Text className="font-semibold">{String(data)}</Text>
        </View>
      )}
    </View>
  );
}

export default Storage;
