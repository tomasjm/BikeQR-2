import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Data } from "types";

interface Props {
  item: Data;
}
export const HomeListButtons = ({ item }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-white p-4"
      onPress={() =>
        router.push({
          pathname: item.screen,
        })
      }
    >
      <View
        key={item.id}
        className="shadow-gray flex-row items-end space-x-4 rounded-md border border-gray-200 bg-white p-1 px-8 shadow-sm"
      >
        <Image
          className="h-40 w-40"
          style={{ resizeMode: "contain" }}
          source={item.image}
        />
        <Text className="justify-center text-base font-bold">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
