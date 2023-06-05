import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const Register = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full items-center gap-10 p-4">
      <Text>This page will register a new bike into the system</Text>
    </SafeAreaView>
  );
};

export default Register;
