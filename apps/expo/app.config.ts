import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "BikeQR",
  slug: "create-t3-turbo",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon3.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon3.png",
    resizeMode: "contain",
    backgroundColor: "#FDF6F0",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ufrobikeqr",
  },
  android: {
    package: "com.ufrobikeqr",
    adaptiveIcon: {
      foregroundImage: "./assets/icon3.png",
      backgroundColor: "#FDF6F0",
    },
  },
  extra: {
    eas: {
      projectId: "43249fc0-60ea-45a0-aed2-684bc9da9aa8",
    },
  },
  plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
