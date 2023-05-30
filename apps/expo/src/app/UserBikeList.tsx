import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
  const { data } = api.bike.listByUserId.useQuery({
    userId: "cli7wknah0000tyzw37wgo597",
  });
  const router = useRouter();
  return (
    <View className="items-center">
      <BikeList data={data} />

      <TouchableOpacity
        className="bg-green-000-color w-32 items-center rounded-md p-2 text-base text-white"
        onPress={() => router.back()}
      >
        <Text>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserBikeList;
