import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import { api, setToken } from "../utils/api";

const Index = () => {
  const checkSessionMutation = api.auth.checkSession.useMutation();
  const router = useRouter();
  const animation = useRef(null);
  // Se carga el token del AsyncStorage
  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        if (token !== null) {
          setToken(token);
          checkSessionMutation.mutate();
          // value previously stored
        } else {
          router.push("/auth/UserLogin");
        }
      } catch (e) {
        alert("error " + e);
        // error reading value
      }
    };
    getData();
  }, []);

  if (checkSessionMutation.isSuccess) {
    return <Redirect href="/home" />;
  }

  if (checkSessionMutation.isError) {
    return <Redirect href="/auth/UserLogin" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      {checkSessionMutation.isLoading && (
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
      )}
    </View>
  );
};

export default Index;
