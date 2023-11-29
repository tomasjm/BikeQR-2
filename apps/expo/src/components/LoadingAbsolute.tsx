import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingAbsolute() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
