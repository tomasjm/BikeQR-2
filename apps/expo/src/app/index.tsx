import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-beige-000-color h-full items-center gap-10 p-4">
      <TouchableOpacity
        className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
        onPress={() => router.push("bikeregistry")}
      >
        <Text>Acceder a Registro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
        onPress={() => router.push("bikestatus")}
      >
        <Text>Acceder a estado de bicicletas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
