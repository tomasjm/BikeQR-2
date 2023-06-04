import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { api } from "../utils/api"

const Index = () => {
  const router = useRouter();
  const mutation = api.storage.finishStorageProcess.useMutation();
  const handleFinishStorage = () => {
    mutation.mutate({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGlnb2JtYjgwMDAwdHk0ZWp0d3dtc2VrIiwiYXR0ZW5kYW50SWQiOiJjbGlocjUxbW0wMDAwdHlhbDZkcWtnOHl5IiwiYmlrZUlkIjoiY2xpZ29ibnBzMDAwM3R5NGUwd3UzdHZvNSIsImV4cCI6MTY4NTk5MzEzOSwiaWF0IjoxNjg1OTA2NzM5fQ.zuH_WC6Pb6Mxe4Y99-ko19EmxwRwW0UILMKEy3SQ_Ow", bikeCode: "Ov-rsFJmlw" })
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      console.log(mutation.data)
    }
  }, [mutation.isSuccess])

  return (
    <SafeAreaView className="bg-beige-000-color h-full items-center gap-10 p-4">
      <TouchableOpacity
        className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
        onPress={() => router.push("/BikeRegistry")}
      >
        <Text>Acceder a Registro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-000-color items-center rounded-md p-4 text-base text-white"
        onPress={() => router.push("/UserBikeList")}
      >
        <Text>Acceder a estado de bicicletas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-000-color items-center rounded-md p-4 text-base text-white"
        onPress={() => handleFinishStorage()}
      >
        <Text>Finish storage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
