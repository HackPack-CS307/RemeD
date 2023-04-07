import { View, Text } from "react-native";
import React from "react";
import Logo from "../../assets/images/under_dev.png";
import { Image } from "react-native";

const UnderDev = () => {
  return (
    <View className=" items-center justify-center">
      <Text className="font-semibold text-xl">Still under development...</Text>
      <Image
        source={Logo}
        className="w-[350px] h-[475px] "
        resizeMode="contain"
      />
    </View>
  );
};

export default UnderDev;
