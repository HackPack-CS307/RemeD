import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import BgImg from "../../assets/images/medtrack.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LogoComponent from "../components/LogoComponent";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";

const MedicineTracker = () => {
  const [medication, setMedication] = useState("");
  const [location, setLocation] = useState("");
  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <LogoComponent />
          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <View className="px-2 items-center ">
              <Text className=" font-bold uppercase text-3xl">
                Locate Your Medication
              </Text>
              <Text className=" mt-3 mb-6 text-lg">
                Use RemeD advanced serch
              </Text>
            </View>
            <CustomInput
              placeholder="Search Your Medication"
              value={medication}
              setValue={setMedication}
            />
            <CustomInput
              placeholder="Current Location or Custom Location"
              value={location}
              setValue={setLocation}
            />

            <View className="justify-center items-center mt-2 ">
              <CustomButton text="Route" type="PRIMARY" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default MedicineTracker;
