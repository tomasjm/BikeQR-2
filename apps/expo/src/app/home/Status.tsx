import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Status = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full items-center gap-10 p-4">
      <TouchableOpacity
        className="bg-green-000-color items-center rounded-md border p-4 text-base text-white"
        onPress={() => router.push("/UserBikeList")}
      >
        <Text>Acceder a estado de bicicletas</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Status;
