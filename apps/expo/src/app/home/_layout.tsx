import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { api } from "~/utils/api";

export default () => {
  // const { data } = api.auth.getSession.useQuery();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#000",
          },

          tabBarShowLabel: false,
          tabBarInactiveTintColor: "lightgray",
          tabBarActiveTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="HomePageView"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color}></FontAwesome>
            ),
          }}
        />

        <Tabs.Screen
          name="HelpView"
          options={{
            title: "Ayuda",
            tabBarIcon: () => (
              <MaterialIcons name="help-center" size={24} color="white" />
            ),
          }}
        />
        <Tabs.Screen
          name="AccountView"
          options={{
            title: "Cuenta",
            tabBarIcon: () => (
              <MaterialIcons name="account-circle" size={24} color="white" />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};
