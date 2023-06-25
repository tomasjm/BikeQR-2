import React from "react";
import { FlatList } from "react-native";
import { Data } from "types";

import { mockData } from "~/app/mocks/mockData";
import { HomeListButtons } from "./HomeListButtons";
import useRole from "~/hooks/useRole";

function HomePageViewList() {
  const { role } = useRole();
  return (
    <FlatList
      data={mockData}
      keyExtractor={(item: Data) => item.id.toString()}
      renderItem={({ item }) => {
        if (item.role.includes(role)) {
          return <HomeListButtons item={item} />;
        }
        return <></>;
      }}
    />
  );
}

export default HomePageViewList;
