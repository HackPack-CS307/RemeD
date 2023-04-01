import { View, Text, ImageBackground, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/profile.png";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import LogoComponent from "../components/LogoComponent";
import BackToLanding from "../components/BackToLanding";
import { Feather } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <LogoComponent />

          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <View className=" items-start">
              <Text className="text-[#0d0d0e]  font-bold text-4xl">
                Edit your profile
              </Text>
            </View>
            <View className="items-center justify-center bg-slate-300 rounded-full w-[80px] h-[80px] m-auto my-3">
              <Feather name="user" size={70} color="black" />
            </View>

            <View className="flex-row ">
              <CustomInput
                placeholder="First Name"
                value={firstName}
                setValue={setFirstName}
                type="HALF"
              />
              <CustomInput
                placeholder="Last Name"
                value={lastName}
                setValue={setLastName}
                type="HALF"
              />
            </View>

            <CustomInput
              placeholder="Username"
              value={username}
              setValue={setUsername}
            />
            <CustomInput
              placeholder="email"
              value={email}
              setValue={setEmail}
            />
            <View className="flex-row">
              <CustomInput
                placeholder="Date of Birth"
                value={dob}
                setValue={setDob}
                type="HALF"
              />
              <CustomInput
                placeholder="Gender"
                value={gender}
                setValue={setGender}
                type="HALF"
              />
            </View>
            <View className="justify-center items-center mt-2 mb-5">
              <CustomButton text="Edit" type="PRIMARY" />
            </View>
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

export default Profile;
