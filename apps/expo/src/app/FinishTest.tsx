import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "~/utils/api";
import Button from "~/components/Button";

const FinishTest = () => {
  const confirmFinish = api.storage.confirmFinishStorage.useMutation();
  const { token, code, description } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (confirmFinish.isSuccess && !confirmFinish.data.error) {
      alert("Se ha confirmado el retiro exitosamente");
      AsyncStorage.removeItem(`@${code}`);
      router.push("/");
    }
  }, [confirmFinish.isSuccess]);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        Detalles de la bicicleta
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Código:</Text>
        <Text style={{ fontSize: 15 }}> {code}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Descripción:</Text>
        <Text style={{ fontSize: 15 }}> {description}</Text>
      </View>

      {confirmFinish.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button
          style={{
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
          text="Confirmar retiro"
          onPress={() => {
            confirmFinish.mutate({ token: token as string });
          }}
        />
      )}
    </View>
  );
};
export default FinishTest;
