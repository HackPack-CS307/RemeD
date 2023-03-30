import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        type == "TERITARY"
          ? " bg-transparent w-[100%]"
          : type == "PRIMARY"
          ? "bg-[#0a0a0a] w-[50%] rounded-full"
          : type == "FB"
          ? "bg-[#E7EAF4] w-[100%]"
          : type == "GOOGLE"
          ? "bg-[#FAE9EA] w-[100%]"
          : type == "APPLE"
          ? "bg-[#e3e3e3] w-[100%]"
          : "rounded-lg"
      }  p-[12px] mt-3 items-center  cursor-pointer justify-center `}
    >
      <Text
        className={`${
          type == "TERITARY"
            ? " text-gray-500"
            : type == "PRIMARY"
            ? "text-white"
            : type == "FB"
            ? " text-[#4765A9]"
            : type == "GOOGLE"
            ? "text-[#DD4D44]"
            : type == "APPLE"
            ? "text-[#363636]"
            : ""
        } font-bold justify-center items-center  `}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
