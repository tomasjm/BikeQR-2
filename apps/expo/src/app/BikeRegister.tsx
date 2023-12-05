import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

import { api } from "~/utils/api";
import Button from "~/components/Button";

const BikeRegister = () => {
  const router = useRouter();
  const utils = api.useUtils();

  const [description, setDescription] = useState("");
  const registerBike = api.bike.createUserBike.useMutation();

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleSubmit = () => {
    if (description === "") {
      alert("Por favor, ingrese una descripción");
    } else {
      registerBike.mutate({ description });
    }
  };

  if (registerBike.isSuccess) {
    utils.bike.listUserBikes.refetch();
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={() => router.back()}
          style={{ width: 150, height: 150 }}
          source={require("../resources/successAnimation.json")}
        />
      </SafeAreaView>
    );
  }
  if (registerBike.isError) {
    alert("Ha ocurrido un error!");
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 space-y-2 pb-2">
        <Text className="p-4 text-left text-base font-semibold italic">
          Por favor, ingrese la descripción de su bicicleta en el campo a
          continuación:
        </Text>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={handleDescriptionChange}
          className="rounded-md border p-3"
        />
      </View>
      <View className="mx-4 items-center">
        {registerBike.isLoading ? (
          <View className="items-center justify-end">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <Button text="Registrar" onPress={() => handleSubmit()} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BikeRegister;
