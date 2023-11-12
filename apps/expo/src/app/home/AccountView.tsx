import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";

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
  const utils = api.useContext();
  const [startLogout, setStartLogout] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const logout = api.auth.logout.useMutation();
  const { data: sessionData } = api.auth.getSession.useQuery();
  const sessionId = sessionData?.user.id;
  const { data: userData } = api.user.one.useQuery({
    id: sessionId as string,
  });
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleIsDisabled = () => {
    setIsDisabled(!isDisabled);
  };
  useEffect(() => {
    if (startLogout && (logout.isSuccess || logout.isError)) {
      setToken("");
      console.log("OK");
      utils.invalidate();
      router.replace("auth/UserLogin");
    }
  }, [logout.isSuccess, logout.isError, startLogout]);

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
        <View style={{ flex: 1 }}>
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
                  onPress={handleIsDisabled}
                  text={!isDisabled ? "Editar" : "Cancelar"}
                />
                {isDisabled && (
                  <Button onPress={handleSubmit(onSubmit)} text="Guardar" />
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
        </View>
      ) : (
        <LoadingView />
      )}
    </View>
  );
}
