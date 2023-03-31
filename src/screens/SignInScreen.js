import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import BgImg from "../../assets/images/loginbg.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";

// firebase imports
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { authentication } from "../../firebase";
import UserContext from "../context/UserContext";
// import { useAuth } from "../context/useAuth";

// toast notify
import Toast from "react-native-toast-message";

const SignInScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(UserContext);

  // const { user, setUser } = useAuth();

  // state change after auth

  // useEffect(() => {
  //   const unsubscribe = authentication.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.replace();
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = userCredential.user.uid;

        // ...
        // console.warn("log in");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          var toastMessage1 = "Wrong user credentials. ";
          var toastMessage2 = "Please check again!";
        } else if (errorCode === "auth/user-not-found") {
          var toastMessage1 = "Invalid User. ";
          var toastMessage2 = "Please Sign up first!";
        } else if (errorCode === "auth/invalid-email") {
          var toastMessage1 = "Invalid Email address. ";
          var toastMessage2 = "Please use a valid email address!";
        } else if (errorCode === "auth/too-many-requests") {
          var toastMessage1 = "Account is temporarily disabled!";
          var toastMessage2 = "Too many failed login attempts! ";
        } else {
          var toastMessage1 = "Something went wrong.";
          var toastMessage2 = "Please try again later! ";
        }
        // console.warn(errorCode);
        Toast.show({
          type: "error",
          text1: toastMessage1,
          text2: toastMessage2,
          position: "top-right",
          visibilityTime: 5000,
        });
      });
  };

  // const { isLoggedIn, setIsLoggedIn } = useLogin();

  // const handleLoginState = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // };

  return (
    <>
      <SafeAreaView className="flex-1">
        <StatusBar hidden={false} />
        <ImageBackground source={BgImg} className="h-[100%] ">
          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <LogoComponent />
            <View>
              <Text className=" font-bold uppercase text-5xl">Hello</Text>
              <Text className=" mt-1 text-lg">Log In to continue</Text>
            </View>
            <CustomInput
              placeholder="Email"
              value={username}
              setValue={setUsername}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity className="items-end mt-2">
              <Text className="uppercase">Forgot Password ?</Text>
            </TouchableOpacity>
            <View className="justify-center items-center mt-2 ">
              <CustomButton
                text="Sign In"
                onPress={handleSignIn}
                type="PRIMARY"
              />
            </View>
            <View className="mt-3 bottom-0">
              <CustomButton
                text="Don't have an account? Sign up"
                onPress={() => navigation.navigate("SignUpScreen")}
                type="TERITARY"
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default SignInScreen;
