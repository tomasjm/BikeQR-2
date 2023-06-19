import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomePageList from "~/components/HomePageList";
import { api } from "~/utils/api";

const HomePage = () => {
  const { data } = api.auth.getSession.useQuery();
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-2xl font-bold">Bienvenido a BikeQR</Text>
      <View className="flex-1">
        <HomePageList role={data?.user?.role as string} />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
