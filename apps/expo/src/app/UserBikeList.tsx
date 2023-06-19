import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import BikeList from "~/components/BikeList";

type ItemProps = { title: string };
export const Item = ({ title }: ItemProps) => (
  <View>
    <Text>{title}</Text>
  </View>
);
function UserBikeList() {
  const { data } = api.bike.listUserBikes.useQuery();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <BikeList data={data} />

      <TouchableOpacity
        className="bg-yellow-000-color w-32 items-center rounded-md border p-2 text-base text-white"
        onPress={() => router.back()}
      >
        <Text>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default UserBikeList;
