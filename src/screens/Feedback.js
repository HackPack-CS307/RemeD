import { View, Text, ImageBackground } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/presc.png";
import LogoComponent from "../components/LogoComponent";
import { ScrollView } from "react-native-gesture-handler";
import BackToLanding from "../components/BackToLanding";
import UnderDev from "../components/UnderDev";

const Feedback = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoComponent />,
    });
  }, []);
  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
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

export default Feedback;
