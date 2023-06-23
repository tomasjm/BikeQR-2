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
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Inicio", headerShown: false }}
          />
          <Stack.Screen
            name="auth/UserRegister"
            options={{
              title: "BIKEQR",
              headerStyle: { backgroundColor: "#FFD23A" },
            }}
          />
          <Stack.Screen
            name="auth/UserLogin"
            options={{
              title: "BIKEQR",
              headerStyle: { backgroundColor: "#FFD23A" },
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
