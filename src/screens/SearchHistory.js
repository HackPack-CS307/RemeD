import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import BgImg from "../../assets/images/pharmacy.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";
import BackToLanding from "../components/BackToLanding";
import UnderDev from "../components/UnderDev";

const SearchHistory = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoComponent />,
    });
  }, []);
  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-5 mt-[100px]"
          >
            <UnderDev />
          </ScrollView>
          <BackToLanding
            onPress={() => {
              navigation.navigate("FindMedicine");
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default SearchHistory;
