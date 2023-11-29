import React, { useEffect } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Entypo, FontAwesome, Foundation } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import LoadingAbsolute from "~/components/LoadingAbsolute";

export interface UserRegisterProps {
  name: string;
  email: string;
  password: string;
}
export default function UserRegister() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserRegisterProps>();
  const userRegisterMutation = api.auth.register.useMutation();
  const onSubmit = (data: UserRegisterProps) => {
    const email = data.email.toLowerCase();
    const password = data.password;
    const name = data.name;
    userRegisterMutation.mutate({ name, email, password });
  };
  const router = useRouter();

  useEffect(() => {
    if (userRegisterMutation.isSuccess && !userRegisterMutation.data?.error) {
      router.back();
      reset();
    } else if (userRegisterMutation.data?.error) {
      Alert.alert("Error", `${userRegisterMutation.data.msg}`);
    }
  }, [userRegisterMutation.isSuccess]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {userRegisterMutation.isLoading && <LoadingAbsolute />}
      <View className="space-y-4">
        <View className="-mb-10 -mt-10 items-center">
          <Image
            alt="Logo de BikeQR"
            style={{ resizeMode: "cover", width: 380, height: 380 }}
            source={require("../../resources/BikeQRVectorLogo.png")}
          />
        </View>
        <View className="space-y-5">
          <View className="items-center">
            <Text className="text-2xl font-bold uppercase">Registro</Text>
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
                      size={20}
                      color="black"
                      style={{ width: 20, height: 20, textAlign: "center" }}
                    />
                    <TextInput
                      className="flex-1 rounded-md border p-3"
                      placeholder="Juan Pérez..."
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="name"
              />
              {errors.name && (
                <Text className="text-red-600">Campo requerido</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center space-x-2">
                    <Entypo
                      name="email"
                      size={20}
                      color="black"
                      style={{ width: 20, height: 20, textAlign: "center" }}
                    />
                    <TextInput
                      className="flex-1 rounded-md border p-3"
                      placeholder="example@example.com"
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="email"
              />
              {errors.email && (
                <Text className="text-red-600">Campo requerido</Text>
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
                      size={20}
                      color="black"
                      style={{ width: 20, height: 20, textAlign: "center" }}
                    />
                    <TextInput
                      autoCapitalize="none"
                      secureTextEntry={true}
                      className="flex-1 rounded-md border p-3"
                      placeholder="Contraseña..."
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="password"
              />
              {errors.password && (
                <Text className="text-red-600">Campo requerido</Text>
              )}
            </View>
          </View>
        </View>
        <View className="items-center pt-5">
          <TouchableOpacity
            className="bg-yellow-000-color rounded-md border p-2 px-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
