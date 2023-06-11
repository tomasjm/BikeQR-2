import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Register = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center gap-10 bg-white p-4">
      <Text>This page will register a new bike into the system</Text>
      <TouchableOpacity
        className="bg-green-000-color items-center rounded-md border p-4 text-base text-white"
        onPress={() => router.push("/BikeRegister")}
      >
        <Text>Registrar bicicleta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
