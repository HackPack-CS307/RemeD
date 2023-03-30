import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import BgImg from "../../assets/images/sidebar.png";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";

const CustomDrawer = (props) => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={BgImg}
        className="flex-1 "
        style={StyleSheet.imageBackground}
      >
        <DrawerContentScrollView {...props}>
          <View>
            <DrawerItemList
              {...props}
              className=" flex-1 p-20 justify-center items-center bg-transparent"
            />
          </View>
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  imageBackground: {
    resizeMode: "cover",
    flex: 1,
  },
});
