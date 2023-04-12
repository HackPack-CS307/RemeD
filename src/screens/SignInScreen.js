import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from "react";
import BgImg from "../../assets/images/loginbg.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import LogoComponent from "../components/LogoComponent";
import Logo from "../../assets/images/logo.png";
import { Image } from "react-native";

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
  const { setUid } = useContext(UserContext);
  const { setUserEmail } = useContext(UserContext);

  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.message) {
      Toast.show({
        type: "info",
        text1: route.params.message,
        visibilityTime: 5000,
      });
    }
  }, [route.params]);
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
        setUid(userId);
        setUserEmail(user.email);
        console.log(userId);
        console.log(user.email);

        // ...
        // console.warn("log in");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
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
      <ImageBackground source={BgImg} className="h-[100%] ">
        <View className=" top-0 right-0">
          <Image
            source={Logo}
            className="w-[600px] h-[200px] "
            resizeMode="contain"
          />
        </View>
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />

          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
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
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
        <View className="absolute bottom-0 mb-[38px] mx-auto pl-[60px] w-min">
          <CustomButton
            text="Don't have an account? Sign up"
            onPress={() => navigation.navigate("SignUpScreen")}
            type="TERITARY"
          />
        </View>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default SignInScreen;
