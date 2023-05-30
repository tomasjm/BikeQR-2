import React from "react";
import { FlatList, Text, View } from "react-native";

type Bici = {
  data: any;
};
function BikeList({ data }: Bici) {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <Text />}
      renderItem={({ item }) => (
        <View key={item.id} className=" pt-5">
          <Text>Descripción: {item.description}</Text>
        </View>
      )}
      className="mb-10"
    />
  );
}
export default BikeList;
