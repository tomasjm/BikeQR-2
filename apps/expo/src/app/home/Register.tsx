import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Register = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full items-center gap-10 p-4">
      <Text>This page will register a new bike into the system</Text>
      <TouchableOpacity
        className="bg-green-000-color items-center rounded-md p-4 text-base text-white"
        onPress={() => router.push("/BikeRegister")}
      >
        <Text>Registrar bicicleta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
