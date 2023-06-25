import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { ItemCard } from "./ItemCard";

type Bici = {
  data: any;
};
function BikeList({ data }: Bici) {
  const router = useRouter();
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Text />}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="bg-white p-4"
          onPress={() =>
            router.push({
              pathname: "BikeDetail",
            })
          }
        >
          <ItemCard item={item} />
        </TouchableOpacity>
      )}
    />
  );
}
export default BikeList;
