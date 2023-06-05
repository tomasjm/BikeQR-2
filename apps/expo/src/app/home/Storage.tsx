import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Storage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full items-center gap-10 p-4">
      <TouchableOpacity
        className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
        onPress={() => router.push("/BikeStorage")}
      >
        <Text>Ingreso de Bicicletas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Storage;
