import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

export default function UserLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = (data: any) => console.log(data);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="space-y-4">
        <View className="-mb-10 -mt-10 items-center">
          <Image
            style={{ resizeMode: "cover", width: 380, height: 380 }}
            source={require("../../images/BikeQRVectorLogo.png")}
          />
        </View>
        <View className="space-y-5">
          <View className="items-center">
            <Text className="text-2xl font-bold uppercase">
              Inicio de sesión
            </Text>
          </View>
          <View className="space-y-2 px-14">
            <TextInput
              className="rounded-md border p-3"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.exampleRequired && <Text>This field is required</Text>}

            <TextInput
              className="rounded-md border p-3"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            {errors.exampleRequired && <Text>This field is required</Text>}
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
