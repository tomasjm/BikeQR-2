import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Redirect } from "expo-router";

import { api, setToken } from "../utils/api";
import UserLogin from "./auth/UserLogin";

const Index = () => {
  // Cargas el token del localstorage
  const checkSessionMutation = api.auth.checkSession.useMutation();
  React.useEffect(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGlzMGMwcGUwMDAwdHl2a3ljdnZ1MTY0IiwiZXhwIjoxNjg2NjExMTI5LCJpYXQiOjE2ODY1MjQ3Mjl9.!uzXhU6OcewcnhfpDYXDd8IFPE023GlE9TjogJVGKzAg",
    );
    checkSessionMutation.mutate();
  }, []);

  useEffect(() => {
    console.log(checkSessionMutation.isSuccess);
    console.log(checkSessionMutation.data);
  }, [checkSessionMutation.isSuccess]);

  if (checkSessionMutation.isSuccess) {
    return <Redirect href="/home" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      {checkSessionMutation.isLoading && (
        <View>
          <ActivityIndicator size="large" color="#000" />
          <Text className="text-base font-semibold">Cargando</Text>
        </View>
      )}
      {!checkSessionMutation.isSuccess && !checkSessionMutation.isLoading && (
        <Redirect href="/auth/UserLogin" />
      )}
    </View>
  );
};

export default Index;
