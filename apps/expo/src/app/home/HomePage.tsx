import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomePageList from "~/components/HomePageList";

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-2xl font-bold">Bienvenido a BikeQR</Text>
      <View className="flex-1">
        <HomePageList />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
