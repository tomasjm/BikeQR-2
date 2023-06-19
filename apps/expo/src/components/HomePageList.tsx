import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

function HomePageList({ role }: { role: string }) {
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
      role: "ATTENDANT",
      image: require("../images/parkingBike.jpg"),
    },
    {
      id: 3,
      title: "Estado de Bicicletas",
      screen: "/home/Status",
      image: require("../images/21936.jpg"),
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        if ((item.role && role === "ATTENDANT") || !item.role) {
          return <HomeButton item={item} />
        }
        return <></>
      }}
    />
  );
}


const HomeButton = ({ item }: { item: any }) => {
  const router = useRouter()
  return (
    <TouchableOpacity
      className="bg-white p-4"
      onPress={() => router.push(item.screen)}
    >
      <View
        key={item.id}
        className="flex-row items-end space-x-4 rounded-md border border-gray-200 bg-white p-1 px-8 shadow-sm shadow-gray"
      >
        <Image
          className="h-40 w-40"
          style={{ resizeMode: "contain" }}
          source={item.image}
        />
        <Text className="justify-center text-base font-bold">
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>

  );
}

export default HomePageList;
