import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api, setToken } from "~/utils/api";



export default function AccountView() {
  const utils = api.useContext();
  const [startLogout, setStartLogout] = useState<boolean>(false);
  const logout = api.auth.logout.useMutation();
  const router = useRouter();
  useEffect(() => {
    if (startLogout && (logout.isSuccess || logout.isError)) {
      setToken("");
      console.log("OK")
      utils.invalidate()
      router.replace("auth/UserLogin");
    }
  }, [logout.isSuccess, logout.isError, startLogout]);
  return (
    <View>
      <Text>AccountView</Text>
      {logout.isLoading && <ActivityIndicator />}
      <TouchableOpacity
        onPress={() => {
          logout.mutate();
          setStartLogout(true);
        }}
      >
        <Text className="font-bold text-yellow-600">Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
