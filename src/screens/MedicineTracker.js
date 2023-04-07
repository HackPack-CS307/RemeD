import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/medtrack.png";
import FindMedicine from "./FindMedicine";
import { Button } from "react-native";
import BackToLanding from "../components/BackToLanding";
import UnderDev from "../components/UnderDev";

const MedicineTracker = ({ navigation }) => {
  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <LogoComponent />
          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <UnderDev />
            <BackToLanding
              onPress={() => {
                navigation.navigate("FindMedicine");
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default MedicineTracker;
