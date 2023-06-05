import { Tabs } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F0E9CC",
        },
        tabBarActiveTintColor: "red",

        headerStyle: {
          backgroundColor: "#F0E9CC",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="HomePage"
        options={{
          title: "Inicio",
          tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black"></FontAwesome>
          ),
        }}
      />
      <Tabs.Screen
        name="Register"
        options={{
          title: "Registro",
          tabBarIcon: () => (
            <Octicons name="person-add" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Storage"
        options={{
          title: "Ingreso de Bicicletas",
          tabBarIcon: () => (
            <Octicons name="diff-added" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Status"
        options={{
          title: "Estado de bicicletas",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="bike" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};
