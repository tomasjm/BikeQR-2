import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomePageList from "~/components/HomePageList";
import useNotifications from "~/hooks/useNotifications";
import { api } from "~/utils/api";

const HomePage = () => {
  const { data } = api.auth.getSession.useQuery();
  const { error, token, notification, requestPermissions } = useNotifications();
  const setupNotificationMutation = api.notifications.saveExpoPushToken.useMutation();

  useEffect(() => {
    console.log("pidiendo permisos")
    requestPermissions()
  }, [])

  useEffect(() => {
    if (notification) {
      alert(JSON.stringify(notification.request.content.data))
    }

  }, [notification])

  useEffect(() => {
    if (error) {
      alert("No llegarán notificaciones")
    }
  }, [error])

  useEffect(() => {
    if (token) {
      setupNotificationMutation.mutate({ expoPushToken: token });
    }
  }, [token])


  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-2xl font-bold">Bienvenido a BikeQR</Text>
      <View className="flex-1">
        <HomePageList role={data?.user?.role as string} />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
