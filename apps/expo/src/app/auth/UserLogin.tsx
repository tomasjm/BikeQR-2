import React, { useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome, Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, useForm } from "react-hook-form";

import { api, setToken } from "~/utils/api";
import { UserRegisterProps } from "./UserRegister";

export default function UserLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserRegisterProps>();
  const router = useRouter();
  const userLoginMutation = api.auth.login.useMutation();
  const onSubmit = (data: any) => {
    const email = data.email.toLowerCase();
    const password = data.password;
    userLoginMutation.mutate({ email, password });
  };

  useEffect(() => {
    const storeData = async (token: string) => {
      try {
        await AsyncStorage.setItem("@token", token);
      } catch (e) {
        alert("error " + e);
      }
    };
    if (userLoginMutation.isSuccess && !userLoginMutation.data?.error) {
      const token = userLoginMutation.data?.token;
      setToken(token as string);
      storeData(token as string);
      router.push("/home");
    } else if (userLoginMutation.data?.error) {
      alert("error:" + userLoginMutation.data?.msg);
    }
  }, [userLoginMutation.isSuccess]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="space-y-4">
        <View className="-mb-10 -mt-10 items-center">
          <Image
            style={{ resizeMode: "cover", width: 380, height: 380 }}
            source={require("../../resources/BikeQRVectorLogo.png")}
          />
        </View>
        <View className="space-y-5">
          <View className="items-center">
            <Text className="text-2xl font-bold uppercase">
              Inicio de sesión
            </Text>
          </View>
          <View className="space-y-2 px-8">
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center space-x-2">
                    <FontAwesome
                      name="user"
                      size={30}
                      color="black"
                      style={{ width: 30, height: 30 }}
                    />
                    <TextInput
                      className="flex-1 rounded-md border p-3"
                      placeholder="Email"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="email"
              />
              {errors.email && (
                <Text className="pl-[40px] text-red-600">Campo requerido</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center space-x-2">
                    <Foundation
                      name="key"
                      size={30}
                      color="black"
                      style={{ width: 30, height: 30 }}
                    />
                    <TextInput
                      secureTextEntry={true}
                      autoCapitalize="none"
                      className="flex-1 rounded-md border p-3"
                      placeholder="Contraseña"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="password"
              />
              {errors.password && (
                <Text className="pl-[40px] text-red-600">Campo requerido</Text>
              )}
            </View>
          </View>
        </View>
        <View className="items-center pt-5">
          <TouchableOpacity
            className="bg-yellow-000-color rounded-md border p-2 px-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center space-y-2">
          <Text className="font-normal">¿No tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("./UserRegister");
            }}
          >
            <Text className="font-bold text-yellow-600">Crear una cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
