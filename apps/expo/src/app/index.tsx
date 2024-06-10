import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import { api, setToken } from "../utils/api";

const Index = () => {
  const checkSessionMutation = api.auth.checkSession.useMutation();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token !== null && !checkSessionMutation.isLoading) {
          setToken(token);
          checkSessionMutation.mutate();
        }
        if (token === null) {
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
  }, [checkSessionMutation.isError, checkSessionMutation.isSuccess]);

  // Render loading state while checking session
  if (checkSessionMutation.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <LottieView
          autoPlay
          loop
          style={{ width: 500, height: 500 }}
          source={require("../resources/loadingbike.json")}
        />
      </View>
    );
  }

  if (checkSessionMutation.isSuccess) {
    return <Redirect href="/home" />;
  }

  if (checkSessionMutation.isError) {
    return <Redirect href="/auth/UserLogin" />;
  }
};

export default Index;
