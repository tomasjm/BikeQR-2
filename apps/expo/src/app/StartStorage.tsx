import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { api } from "../utils/api";

const Index = () => {
  const router = useRouter();
  // Proceso para realizar almacenamiento CON INTERNET
  const [storageId, setStorageId] = React.useState<string>("");
  const [checkingStorage, setCheckingStorage] = React.useState<boolean>(false);
  // LADO ATTENDANT
  // Recibe como parametros: attendantId, userId, bikeId, te devuelve un registro storage
  // la respuesta devuelve el token también en mutation.data
  // con este token, el ATTENDANT genera el QR para el usuario
  const mutation = api.storage.startStorageProcess.useMutation();
  // LADO USUARIO
  // Esta mutation es para confirmar el proceso de storage utilizando el storageId
  // Con el token leido del QR, se debe verificar el proceso de storage al cual corresponde
  // llamando al servidor, a la ruta api.storage.getStorageByToken({ token })
  const mutationConfirm = api.storage.confirmStorage.useMutation();
  // LADO ATTENDANT
  // Al confirmar el storage, se activa el booleando checkingStorage para activar el refetchInterval del hook de abajo
  // lo unico que hace la funcion checkStorageProcess es checkear el status, si el status es STORED significa que el usuario leyó correctamente
  // el token y lo tiene perfecto
  const { data } = api.storage.checkStorageProcess.useQuery(
    { storageId },
    { refetchInterval: checkingStorage ? 1000 : 0 },
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      setStorageId(mutation.data.storage!.id);
      console.log("confirmando storage...");
      mutationConfirm.mutate({ storageId: mutation.data.storage!.id });
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutationConfirm.isSuccess) {
      setCheckingStorage(true);
      console.log("checking storage status...");
    }
  }, [mutationConfirm.isSuccess]);

  useEffect(() => {
    if (data?.status == "STORED") {
      console.log("SUCCESS");
    }
  }, [data]);

  const handleStartStorage = () => {
    mutation.mutate({
      userId: "clis4gjt80000tys9hdep7boh",
      bikeId: "clis4gl6f0003tys99s39y85q",
    });
  };

  return (
    <SafeAreaView className="flex-1 items-center gap-10 bg-white p-4">
      <TouchableOpacity
        className="bg-yellow-000-color w-32 items-center rounded-md border p-2 text-base text-white"
        onPress={() => router.push("/BikeRegistry")}
      >
        <Text>Acceder a Registro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
        onPress={() => router.push("/UserBikeList")}
      >
        <Text>Acceder a estado de bicicletas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-yellow-000-color items-center rounded-md border p-4 text-base text-white"
        onPress={() => handleStartStorage()}
      >
        <Text>Start storage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
