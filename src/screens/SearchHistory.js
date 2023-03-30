import { View, Text } from "react-native";
import React from "react";
import BgImg from "../../assets/images/pharmacy.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";
import BackToLanding from "../components/BackToLanding";

const SearchHistory = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden={false} />
      <ImageBackground source={BgImg} className="h-[100%] ">
        <LogoComponent />
        <ScrollView showsVerticalScrollIndicator={false} className="p-5">
          <View className="pt-10">
            <Text>SearchHistory</Text>
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

export default SearchHistory;
