import { View, Text } from "react-native";
import React from "react";
import Logo from "../../assets/images/logo.png";
import { Image } from "react-native";

const LogoComponent = () => {
  return (
    <View className="-mr-10 mt-2">
      <Image
        source={Logo}
        className="w-[200px] h-[200px] "
        resizeMode="contain"
      />
    </View>
  );
};

export default LogoComponent;
