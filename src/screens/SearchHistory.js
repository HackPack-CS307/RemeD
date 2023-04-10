import { View, Text } from "react-native";
import React from "react";
import BgImg from "../../assets/images/pharmacy.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";
import BackToLanding from "../components/BackToLanding";
import UnderDev from "../components/UnderDev";

const SearchHistory = ({ navigation }) => {
  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <LogoComponent />
          <ScrollView showsVerticalScrollIndicator={false} className="p-5 mt-0">
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
