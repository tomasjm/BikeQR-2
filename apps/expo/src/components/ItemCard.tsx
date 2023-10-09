import React from "react";
import { Image, Text, View } from "react-native";
import { type CardType } from "types";

interface Props {
  item: CardType;
}
export const ItemCard = ({ item }: Props) => {
  return (
    <View
      key={item.id}
      className="shadow-gray flex-row items-end space-x-4 rounded-md border border-gray-200 bg-white p-1 px-8 shadow-sm"
    >
      <Image
        alt="Logo image for the item on the list"
        className="h-40 w-40"
        style={{ resizeMode: "contain" }}
        source={item.image}
      />
      <Text className="justify-center text-base font-bold">{item.title}</Text>
    </View>
  );
};
