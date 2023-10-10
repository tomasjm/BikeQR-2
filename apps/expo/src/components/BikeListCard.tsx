import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

import { api } from "~/utils/api";

interface Props {
  item: {
    id: string;
    title: string;
    code: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export const BikeListCard = ({ item }: Props) => {
  const { data } = api.storage.checkStorageStatusByBikeId.useQuery({
    bikeId: item.id,
  });

  //TODO: integrar skeleton
  //const isLoading = data === undefined;

  const setStatusColor = (data: any) => {
    switch (data) {
      case "STORED":
        return "text-green-500";
      case "COMPLETED":
        return "text-yellow-500";
      case "NOT_STORED":
        return "text-blue-500";
      case "CANCELED":
        return "text-red-500";
      default:
        return "text-black";
    }
  };
  const parseStatus = (data: any) => {
    switch (data) {
      case "STORED":
        return "Almacenada";
      case "COMPLETED":
        return "Completada";
      case "NOT_STORED":
        return "No almacenada";
      case "CANCELED":
        return "Cancelada";
      default:
        return "Sin ingreso por primera vez al sistema";
    }
  };

  return (
    <SafeAreaView
      key={item.id}
      className="shadow-gray items-center justify-center space-x-4 rounded-md border border-gray-200 bg-white shadow-sm"
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
          paddingHorizontal: 30,
        }}
      >
        <Image
          alt="Logo image for the item on the list"
          className="h-36 w-36"
          style={{ resizeMode: "contain" }}
          source={require("../resources/bikePNG.jpg")}
        />
        <View className="flex-col ">
          <Text className="justify-center text-base">
            <Text className="font-bold">Marca: </Text> {item.title}
          </Text>
          <Text className={`justify-center text-base`}>
            <Text className="font-bold">Estado: </Text>
            <Text
              className={`justify-center text-base ${setStatusColor(
                data?.[0]?.status,
              )}`}
            >
              {parseStatus(data?.[0]?.status)}
            </Text>
          </Text>
          {data?.[0]?.updatedat && (
            <Text className={`justify-center text-base`}>
              <Text className="font-bold">Fecha ingreso: </Text>
              {data?.[0]?.updatedat.toLocaleString("es-CL", {
                timeZone: "America/Santiago",
              })}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
