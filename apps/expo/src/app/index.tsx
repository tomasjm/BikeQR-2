import React from "react";
import { Alert, View } from "react-native";
import { Redirect, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import { api, setToken } from "../utils/api";

const Index = () => {
  const checkSessionMutation = api.auth.checkSession.useMutation();
  // Se carga el token del AsyncStorage

  useFocusEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token !== null && !checkSessionMutation.isLoading) {
          setToken(token);
          checkSessionMutation.mutate();
        }
      } catch (e) {
        Alert.alert(
          "Error",
          "Ha ocurrido un error, por favor intente nuevamente.",
        );
      }
    };
    getData();
  });
  console.log(checkSessionMutation.isLoading);

  if (checkSessionMutation.isSuccess) {
    return <Redirect href="/home" />;
  }

  if (checkSessionMutation.isError) {
    return <Redirect href="/auth/UserLogin" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <View className=" items-center justify-center">
          <LottieView
            autoPlay
            loop
            style={{ width: 500, height: 500 }}
            source={require("../resources/loadingbike.json")}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
