import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { api, setToken } from "../utils/api";


const Index = () => {

  // Cargas el token del localstorage
  const checkSessionMutation = api.auth.checkSession.useMutation();
  React.useEffect(() => {
    setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbGlzMGMwcGUwMDAwdHl2a3ljdnZ1MTY0IiwiZXhwIjoxNjg2NjExMTI5LCJpYXQiOjE2ODY1MjQ3Mjl9.uzXhU6OcewcnhfpDYXDd8IFPE023GlE9TjogJVGKzAg")
    checkSessionMutation.mutate()
  }, [])

  useEffect(() => {
    console.log(checkSessionMutation.isSuccess)
    console.log(checkSessionMutation.data)
  }, [checkSessionMutation.isSuccess])

  if (checkSessionMutation.isSuccess) {
    return <Redirect href="/home" />
  }


  return (
    <View>
      {
        (checkSessionMutation.isLoading) && (<Text>Cargando</Text>)
      }
      {
        (!checkSessionMutation.isSuccess && !checkSessionMutation.isLoading) && <Text>no tas logeado</Text>

      }
    </View>
  );
};

export default Index;
