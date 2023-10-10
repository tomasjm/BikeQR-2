import React from "react";
import { Text, TextInput, View } from "react-native";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";

import Button from "~/components/Button";

export default function HelpView() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
      }}
    >
      <View className="">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <SimpleLineIcons
            name="question"
            size={20}
            color="black"
            style={{
              paddingLeft: 24,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              color: "#000000",
              paddingLeft: 15,
              paddingRight: 60,
            }}
          >
            En esta sección, usted podrá otorgar retroalimentación o consultar
            acerca de problemas sobre el uso de la aplicación.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <EvilIcons
            name="exclamation"
            size={30}
            color="black"
            style={{
              paddingLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              lineHeight: 19,
              color: "#000000",
              paddingLeft: 10,
              paddingRight: 60,
            }}
          >
            Nos comunicaremos con usted a través de correo electrónico.
          </Text>
        </View>
      </View>
      <View className="space-y-2 px-5 pt-10">
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <Text
                  className="py-2"
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#000000",
                  }}
                >
                  Asunto:
                </Text>
                <TextInput
                  style={{
                    width: "100%",
                    borderWidth: 0.5,
                    borderRadius: 5,
                    padding: 12,
                  }}
                  placeholder="Escriba el asunto del problema ..."
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="issue"
          />
          {errors.name && (
            <Text className="pl-[40px] text-red-600">Campo requerido</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View>
                <Text
                  className="py-2"
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: "#000000",
                  }}
                >
                  Descripción:
                </Text>
                <View
                  className="border-gray-300"
                  style={{
                    width: "100%",
                    height: 200,
                    borderWidth: 0.5,
                    borderRadius: 5,
                  }}
                >
                  <TextInput
                    multiline
                    onChangeText={onChange}
                    value={value}
                    placeholder="Al realizar esta acción surge este problema ..."
                    style={{
                      width: "100%",
                      padding: 12,
                    }}
                  />
                </View>
              </View>
            )}
            name="description"
          />
          {errors.description && (
            <Text className="pl-[40px] text-red-600">Campo requerido</Text>
          )}
        </View>
      </View>
      <View className="items-end px-5 pt-5">
        <Button onPress={handleSubmit(onSubmit)} text="Enviar" />
      </View>
    </View>
  );
}
