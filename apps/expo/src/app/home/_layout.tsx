import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export const HomeLayout = () => {
  // const { data } = api.auth.getSession.useQuery();
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#000",
            height: 60,
          },
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "lightgray",
          tabBarActiveTintColor: "#FFFFFF",
          headerStyle: {
            backgroundColor: "#FFD23A",
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
                className="color-white mr-3 flex-col items-end -space-y-4 rounded-full opacity-80 "
              >
                <MaterialIcons name="account-circle" size={40} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={30} color={color}></FontAwesome>
            ),
          }}
        />

        <Tabs.Screen
          name="HelpView"
          options={{
            title: "Ayuda",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="help-center" size={30} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="AccountView"
          options={{
            title: "Cuenta",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};
export default HomeLayout;
