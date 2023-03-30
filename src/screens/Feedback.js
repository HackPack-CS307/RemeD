import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/presc.png";
import LogoComponent from "../components/LogoComponent";
import { ScrollView } from "react-native-gesture-handler";
import BackToLanding from "../components/BackToLanding";

const Feedback = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar hidden={false} />
      <ImageBackground source={BgImg} className="h-[100%] ">
        <LogoComponent />
        <ScrollView showsVerticalScrollIndicator={false} className="p-5">
          <View>
            <Text>Feedback</Text>
          </View>
          <BackToLanding
            onPress={() => {
              navigation.navigate("FindMedicine");
            }}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Feedback;
