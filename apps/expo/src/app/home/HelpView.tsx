import React from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function HelpView() {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
        source={require("../../resources/loading.json")}
      />
    </View>
  );
}
