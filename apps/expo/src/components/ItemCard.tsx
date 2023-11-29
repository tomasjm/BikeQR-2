import React from "react";
import { Image, Text, View, useWindowDimensions } from "react-native";
import { type CardType } from "types";

interface Props {
  item: CardType;
}
export const ItemCard = ({ item }: Props) => {
  const { width } = useWindowDimensions();
  console.log(width);
  return (
    <View
      key={item.id}
      style={{
        flex: 1,
        flexDirection: `${width >= 360 ? "row" : "column"}`,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        shadowColor: "#000",
        marginTop: 10,
        padding: 10,
      }}
    >
      <Image
        alt="Logo image for the item on the list"
        className="h-36 w-36"
        style={{ resizeMode: "contain" }}
        source={item.image}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          marginLeft: 10,
          marginRight: 10,
          alignSelf: "flex-end",
        }}
      >
        {item.title}
      </Text>
    </View>
  );
};
