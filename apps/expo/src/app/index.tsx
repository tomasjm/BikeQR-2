import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Redirect, useRouter } from "expo-router";

const Index = () => {

  return (
   
    <Redirect href="/home" />
  );
};

export default Index;
