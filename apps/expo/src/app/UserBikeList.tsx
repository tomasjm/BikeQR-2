import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";
import BikeList from "~/components/BikeList";
import LoadingView from "~/components/LoadingView";

function UserBikeList() {
  const userId = api.auth.getSession.useQuery().data?.user.id;
  const { data } = api.bike.listUserBikes.useQuery({
    userId: userId as string,
  });
  const mappedData = data?.map(({ description, ...rest }) => ({
    ...rest,
    title: description,
  }));

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      {data ? <BikeList data={mappedData} /> : <LoadingView />}
    </SafeAreaView>
  );
}

export default UserBikeList;
