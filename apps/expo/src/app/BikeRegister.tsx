import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";

const BikeRegister = () => {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const registerBike = api.bike.createUserBike.useMutation();

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleSubmit = () => {
    registerBike.mutate({ description });
  };

  useEffect(() => {
    if (registerBike.isSuccess) {
      alert("Bicicleta agregada!")
      router.back()
    }
  }, [registerBike.isSuccess])

  if (registerBike.isError) {
    alert("Ha ocurrido un error!")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 space-y-2 pb-2">
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={handleDescriptionChange}
          className="rounded-md border p-3"
        />
      </View>
      <View className="mx-4 items-center">
        {registerBike.isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            className="bg-yellow-000-color rounded-md border p-2 px-4"
            onPress={() => handleSubmit()}
          >
            <Text>Submit</Text>
          </TouchableOpacity>

        )}
      </View>
    </SafeAreaView>
  );
};

export default BikeRegister;
