import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import Button from "~/components/Button";

export default function HelpView() {
  const sendEmail = api.email.send.useMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const onSubmit = (data: any) => {
    const { issue, description } = data;
    sendEmail.mutate({ subject: issue, body: description });
  };
  useEffect(() => {
    if (sendEmail.isSuccess && !sendEmail.isLoading) {
      reset({ description: "", issue: "" });
    }
  }, [sendEmail.isSuccess, sendEmail.isLoading]);

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
    }, []),
  );
  if (sendEmail.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  if (sendEmail.isSuccess) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            sendEmail.reset();
          }}
          style={{ width: 150, height: 150 }}
          source={require("../../resources/successAnimation.json")}
        />
      </SafeAreaView>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
                  className="border-gray-300"
                  placeholder="Escriba el asunto del problema ..."
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="issue"
          />
          {errors.issue && (
            <Text
              style={{
                color: "#ff0000",
                fontSize: 14,
                textAlign: "right",
                paddingRight: 2,
              }}
            >
              Campo requerido
            </Text>
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
            <Text
              style={{
                color: "#ff0000",
                fontSize: 14,
                textAlign: "right",
                paddingRight: 2,
              }}
            >
              Campo requerido
            </Text>
          )}
        </View>
      </View>
      <View className="items-end px-5 pt-5">
        <Button
          onPress={() => {
            handleSubmit(onSubmit);
          }}
          text="Enviar"
        />
      </View>
      <View className="flex-1 justify-center">
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
            color="#000000"
            style={{
              paddingLeft: 24,
            }}
          />
          <Text
            style={{
              fontSize: 14,
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
            color="#000000"
            style={{
              paddingLeft: 20,
            }}
          />
          <Text
            style={{
              fontSize: 14,
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
    </View>
  );
}
