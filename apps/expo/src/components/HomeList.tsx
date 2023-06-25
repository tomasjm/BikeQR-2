import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { DataList } from "types";

import useRole from "~/hooks/useRole";
import { ItemCard } from "./ItemCard";

interface Props {
  data: DataList;
}

export default function HomeList({ data }: Props) {
  const { role } = useRole();
  const router = useRouter();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        if (item.role.includes(role)) {
          return (
            <TouchableOpacity
              className="bg-white p-4"
              onPress={() =>
                router.push({
                  pathname: item.screen,
                })
              }
            >
              <ItemCard item={item} />
            </TouchableOpacity>
          );
        }
        return null;
      }}
    />
  );
}
