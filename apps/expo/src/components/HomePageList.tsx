import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

function HomePageList() {
  const data = [
    {
      id: 1,
      title: "Registro de Bicicletas",
      screen: "BikeRegister",
      image: require("../images/bikeRegistry.png"),
    },
    {
      id: 2,
      title: "Ingreso de Bicicletas",
      screen: "/home/Storage",
      image: require("../images/parkingBike.jpg"),
    },
    {
      id: 3,
      title: "Estado de Bicicletas",
      screen: "/home/Status",
      image: require("../images/21936.jpg"),
    },
  ];
  const router = useRouter();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="  bg-white p-2"
          onPress={() => router.push(item.screen)}
        >
          <View
            key={item.id}
            className="flex-row space-x-4 rounded-md border border-gray-200 bg-white p-4"
          >
            <Image className="h-44 w-44 " source={item.image} />
            <Text className="items-center font-bold">{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
      className="pb-20"
    />
  );
}

export default HomePageList;
