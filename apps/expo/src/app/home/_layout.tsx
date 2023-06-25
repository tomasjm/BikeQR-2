import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default () => {
  // const { data } = api.auth.getSession.useQuery();
  const router = useRouter()

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
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  router.push("./AccountView");
                }}
                className="flex-col items-end -space-y-4 pr-4 opacity-40"
              >
                <MaterialIcons name="account-circle" size={38} color="black" />
              </TouchableOpacity>
            ),
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
