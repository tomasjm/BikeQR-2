import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, type FieldValues } from "react-hook-form";

import { ProfileDataTitles } from "~/utils/Titles";
import { api, setToken } from "~/utils/api";
import Button from "~/components/Button";
import InputForm from "~/components/InputForm";
import LoadingView from "~/components/LoadingView";

type User = {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
};

export default function AccountView() {
  const utils = api.useUtils();
  const [startLogout, setStartLogout] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const logout = api.auth.logout.useMutation();
  const { data: sessionData } = api.auth.getSession.useQuery();
  const sessionId = sessionData?.user.id;
  const { data: userData } = api.user.one.useQuery({
    id: sessionId as string,
  });
  const editUser = api.user.editUser.useMutation();
  const router = useRouter();
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    editUser.mutate({
      id: sessionId as string,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setIsDisabled(!isDisabled);
  };
  useEffect(() => {
    if (editUser.isSuccess) {
      alert("Usuario actualizado correctamente");
    }
  }, [editUser.isSuccess]);

  const logOutAction = useCallback(async () => {
    if (startLogout && (logout.isSuccess || logout.isError)) {
      setToken("");
      await AsyncStorage.removeItem("@token");
      utils.invalidate();
      console.log("logout in process..");
      router.replace("auth/UserLogin");
    }
  }, [startLogout, logout.isSuccess, logout.isError]);

  useEffect(() => {
    logOutAction();
  }, [logOutAction]);

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
    }, []),
  );
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {userData ? (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              padding: 20,
            }}
          >
            <MaterialIcons name="account-circle" size={100} color="#888" />
            <Text>Perfil</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <ScrollView className="space-y-2 px-5" style={{ flexGrow: 1 }}>
              {userData &&
                ProfileDataTitles.map((item, index) => (
                  <InputForm
                    isDisabled={isDisabled}
                    key={index}
                    control={control}
                    errors={errors}
                    labelTitle={item.name}
                    name={item.key}
                    hiddenText={item.hiddenText}
                    value={(userData as User)[item.key]}
                  />
                ))}
            </ScrollView>
            <View
              style={{
                flex: 2,
              }}
            >
              <View className="flex-row justify-end space-x-2 px-5 pt-5">
                <Button
                  onPress={() => setIsDisabled(!isDisabled)}
                  text={!isDisabled ? "Editar" : "Cancelar"}
                />
                {isDisabled && (
                  <Button
                    onPress={() => onSubmit(control._formValues)}
                    text="Guardar"
                  />
                )}
              </View>
              <View
                style={{
                  padding: 20,
                  justifyContent: "center",
                }}
              >
                {logout.isLoading && <ActivityIndicator />}
                <TouchableOpacity
                  onPress={() => {
                    logout.mutate();
                    setStartLogout(true);
                  }}
                >
                  <Text className="text-lg font-bold text-yellow-600">
                    Cerrar sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingView />
      )}
    </View>
  );
}
