import { View, Text, Touchable } from "react-native";
import React from "react";
import { Button } from "react-native";
import FindMedicine from "../screens/FindMedicine";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const BackToLanding = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="">
      <Ionicons name="arrow-back-circle-sharp" size={50} color="black" />
    </TouchableOpacity>
  );
};

export default BackToLanding;
