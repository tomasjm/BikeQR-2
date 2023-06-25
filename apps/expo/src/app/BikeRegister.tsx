import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import Button from "~/components/Button";

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
      alert("Bicicleta agregada!");
      router.back();
    }
  }, [registerBike.isSuccess]);

  if (registerBike.isError) {
    alert("Ha ocurrido un error!");
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
          <Button text="Registrar" onPress={() => handleSubmit()} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BikeRegister;
