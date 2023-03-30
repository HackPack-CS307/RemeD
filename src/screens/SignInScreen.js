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
import ToastManager, { Toast } from "toastify-react-native";

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
        const toastMessage = "";
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          console.warn("Wrong username psw");
          toastMessage = "Wrong user credentials. Please check again!";
        } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          toastMessage = "Invalid User. Please Sign up first!";
        } else if (
          errorMessage ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resettin later. (auth/too-many-requests)."
        ) {
          toastMessage =
            "Too many failed login attempts! Account is temporarily disabled!";
        }
        console.warn(errorCode);
        Toast.success(toastMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
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
        <ToastManager />
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
    </>
  );
};

export default SignInScreen;
