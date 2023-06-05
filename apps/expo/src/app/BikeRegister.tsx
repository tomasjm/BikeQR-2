import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";

const MyForm = () => {
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
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="User ID"
        value={userId}
        onChangeText={handleUserIdChange}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={handleDescriptionChange}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default MyForm;
