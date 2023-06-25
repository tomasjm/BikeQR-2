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
              title: "Inicio",
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
