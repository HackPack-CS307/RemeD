import { View, Text, ImageBackground } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import BgImg from "../../assets/images/loginbg.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../components/LogoComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../firebase";

const SignUpScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.warn("Sign up...");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar hidden={false} />

      <ImageBackground source={BgImg} className="h-[100%] ">
        <ScrollView showsVerticalScrollIndicator={false} className="p-5">
          <LogoComponent />
          <View className=" items-start">
            <Text className="text-[#0d0d0e]  font-bold text-4xl">Welcome</Text>
            <Text className=" mt-1 text-m font-semibold">
              Don't have an account yet? Register now.
            </Text>
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
          <CustomInput placeholder="email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder="Retype Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            //   hide password
            secureTextEntry={true}
          />
          <View className="justify-center items-center mt-2 mb-5">
            <CustomButton
              text="Register"
              onPress={handleSignUp}
              type="PRIMARY"
            />
            <Text className="my-[25px] text-gray-500">
              By registering, you confirm that you accept our
              <Text className="text-[#fdb075]">Terms</Text> of
              <Text className="text-[#fdb075]">Use and Privacy policy.</Text>
            </Text>
          </View>

          <View className="mt-3  bottom-0 inset-x-0">
            <CustomButton
              text="Allready have an account? Sign In"
              onPress={() => navigation.navigate("SignInScreen")}
              type="TERITARY"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;
