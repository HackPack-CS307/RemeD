import { View, Text, Touchable } from "react-native";
import React from "react";
import { Button } from "react-native";
import FindMedicine from "../screens/FindMedicine";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const BackToLanding = ({ onPress }) => {
  return (
    <View className="justify-end mb-[36px] left-5 z-20 bg-transparent">
      <TouchableOpacity
        onPress={onPress}
        className="w-[50px] h-[50px] rounded-full"
      >
        <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackToLanding;
