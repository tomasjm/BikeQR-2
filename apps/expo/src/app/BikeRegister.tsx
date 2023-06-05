import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";

const BikeRegister = () => {
  const [userId, setUserId] = useState("");

  const [description, setDescription] = useState("");
  const registerBike = api.bike.createByUserId.useMutation();

  const handleUserIdChange = (text: string) => {
    setUserId(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleSubmit = () => {
    registerBike.mutate({ userId, description });
    if (registerBike.isSuccess) {
      setDescription("");
      setUserId("");
      console.log("XD");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-4 space-y-2 pb-2">
        <TextInput
          placeholder="User ID"
          value={userId}
          onChangeText={handleUserIdChange}
          className="rounded-md border p-3"
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={handleDescriptionChange}
          className="rounded-md border p-3"
        />
      </View>
      <View className="mx-4 items-center">
        <TouchableOpacity
          className="bg-green-000-color rounded-md border p-2 px-4"
          onPress={() => handleSubmit()}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BikeRegister;
