import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

export default () => {
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
          name="HomePage"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={24} color={color}></FontAwesome>
            ),
          }}
        />
        <Tabs.Screen
          name="Register"
          options={{
            title: "Registro",
            tabBarIcon: ({ color }) => (
              <Octicons name="person-add" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Storage"
          options={{
            title: "Ingreso",
            tabBarIcon: ({ color }) => (
              <Octicons name="diff-added" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Status"
          options={{
            title: "Estado",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bike" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};
