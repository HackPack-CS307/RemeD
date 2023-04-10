import { View, Text, Touchable } from "react-native";
import React from "react";
import { Button } from "react-native";
import FindMedicine from "../screens/FindMedicine";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const BackToLanding = ({ onPress }) => {
  return (
    <View className="w-[50px] h-[50px] rounded-full ">
      <TouchableOpacity
        onPress={onPress}
        className="w-[50px] h-[50px] rounded-full touch-none"
      >
        <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackToLanding;
