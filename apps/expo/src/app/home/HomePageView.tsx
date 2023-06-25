import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";
import HomePageViewList from "~/components/HomePageList";
import useNotifications from "~/hooks/useNotifications";
import useRole from "~/hooks/useRole";
import { UserRole } from "~/atoms";
import { useRouter } from "expo-router";

const HomePageView = () => {
  const router = useRouter()
  const { data, isSuccess } = api.auth.getSession.useQuery(undefined, { refetchOnMount: "always" });
  const { error, token, notification, requestPermissions } = useNotifications();
  const setupNotificationMutation =
    api.notifications.saveExpoPushToken.useMutation();

  const { setRole } = useRole()
  useEffect(() => {
    if (isSuccess) {
      console.log("ROL:", data?.user.role)
      setRole(data?.user.role as UserRole)
    }
  }, [isSuccess])

  useEffect(() => {
    console.log("pidiendo permisos");
    requestPermissions();
  }, []);

  useEffect(() => {
    if (notification) {
      const { data } = notification.request.content.data
      router.push({ pathname: "FinishTest", params: { token: data.token, code: data.bike.code, description: data.bike.description } })
    }
  }, [notification]);

  useEffect(() => {
    if (error) {
      alert("No llegarán notificaciones");
    }
  }, [error]);

  useEffect(() => {
    if (token) {
      setupNotificationMutation.mutate({ expoPushToken: token });
    }
  }, [token]);

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <Text className="text-2xl font-bold">Bienvenido a BikeQR</Text>
      <View className="flex-1">
        <HomePageViewList />
      </View>
    </SafeAreaView>
  );
};

export default HomePageView;
