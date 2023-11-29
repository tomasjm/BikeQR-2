import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { TRPCProvider } from "~/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <SafeAreaProvider className="">
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFD23A",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "BIKEQR",
              headerStyle: {
                backgroundColor: "#FFD23A",
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="StartStorage"
            options={{
              title: "Ingreso",
            }}
          />
          <Stack.Screen
            name="StoreBike"
            options={{
              title: "Ingreso",
            }}
          />
          <Stack.Screen
            name="BikeRegister"
            options={{
              title: "Registro",
            }}
          />
          <Stack.Screen
            name="FinishStorage"
            options={{
              title: "Retiro",
            }}
          />
          <Stack.Screen
            name="auth/UserRegister"
            options={{
              title: "BIKEQR",
            }}
          />
          <Stack.Screen
            name="auth/UserLogin"
            options={{
              title: "BIKEQR",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="ScannerBarCode" options={{ title: "Escáner" }} />
          <Stack.Screen
            name="UserBikeList"
            options={{ title: "Lista de Bicicletas" }}
          />
        </Stack>
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
