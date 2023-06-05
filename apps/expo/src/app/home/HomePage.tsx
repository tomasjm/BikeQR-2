import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import HomePageList from "~/components/HomePageList";

const HomePage = () => {
  return (
    <View className="h-full items-center bg-white p-4">
      <Text className="text-2xl">Bienvenido a BikeQR</Text>
      <View>
        <HomePageList></HomePageList>
      </View>
    </View>
  );
};

export default HomePage;
