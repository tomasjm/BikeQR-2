import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { BikeListCard } from "./BikeListCard";

type Bici = {
  data:
    | {
        title: string;
        id: string;
        code: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
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
              pathname: "/BikeDetail",
              params: {
                ...item,
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
              },
            })
          }
        >
          <BikeListCard item={item} />
        </TouchableOpacity>
      )}
    />
  );
}
export default BikeList;
