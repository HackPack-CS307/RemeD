import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import BgImg from "../../assets/images/loginbg.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import LogoComponent from "../components/LogoComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../../assets/images/logo.png";
import { Image } from "react-native";

// firebase and firestore auth
import { ScrollView } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../../firebase";
import "firebase/firestore";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

// toast notify
import Toast from "react-native-toast-message";

// form validation
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name is too short!")
      .max(50, "First name is too long!")
      .required("First name is required."),
    lastName: Yup.string()
      .min(2, "Last name is too short!")
      .max(50, "Last name is too long!")
      .required("Last name is required."),
    username: Yup.string()
      .min(2, "Username is too short")
      .max(50, "Username is too long!")
      .required("Username is required."),
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter your email address"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long")
      .required("Please enter your password."),
    passwordRepeat: Yup.string()
      .min(8, "Confirm password must be atleast 8 charcters long.")
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required("Please enter confirm password."),
  });

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <View className=" top-0 right-0 pb-0">
          <Image
            source={Logo}
            className="w-[600px] h-[200px] "
            resizeMode="contain"
          />
        </View>
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-5 pt-0 mt-0"
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View className="">
                <View className=" items-start">
                  <Text className="text-[#0d0d0e]  font-bold text-4xl">
                    Welcome
                  </Text>
                  <Text className=" mt-1 text-m font-semibold">
                    Don't have an account yet? Register now.
                  </Text>
                </View>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                    passwordRepeat: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={async (values) => {
                    try {
                      // Create a new user account with Firebase Authentication
                      await createUserWithEmailAndPassword(
                        authentication,
                        values.email,
                        values.password
                      )
                        .then(async (userCredential) => {
                          // Signed in
                          const user = userCredential.user;
                          const uid = user.uid;
                          // ...
                          // console.warn("Sign up...");

                          await setDoc(doc(db, "users", uid), {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            username: values.username,
                          })
                            .then(() => {
                              console.log("User details added to Firestore");

                              navigation.navigate("SignInScreen", {
                                message: "Please sign in with your new account",
                              });
                            })
                            .catch((error) => {
                              console.log(error.code);
                            });
                        })
                        .catch((error) => {
                          const errorCode = error.code;
                          var type = "error";
                          if (errorCode === "auth/email-already-in-use") {
                            var toastMessage1 = "Email already existed!";
                            var toastMessage2 =
                              "Please use a different email address! ";
                          } else {
                            var toastMessage1 = error.message;
                            var toastMessage2 = "Please try again later! ";
                          }
                          console.log(error);
                          Toast.show({
                            type: type,
                            text1: toastMessage1,
                            text2: toastMessage2,
                            position: "top-right",
                            visibilityTime: 5000,
                          });
                        });
                    } catch (error) {
                      console.error(error);
                      // TODO: Display an error message to the user
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    setFieldTouched,
                    isValid,
                    handleSubmit,
                  }) => (
                    <>
                      <View className="flex-row ">
                        <CustomInput
                          placeholder="First Name"
                          value={values.firstName}
                          setValue={handleChange("firstName")}
                          handleBlur={() => setFieldTouched("firstName")}
                          type="HALF"
                        />

                        <CustomInput
                          placeholder="Last Name"
                          value={values.lastName}
                          setValue={handleChange("lastName")}
                          handleBlur={() => setFieldTouched("lastName")}
                          type="HALF"
                        />
                      </View>
                      <View className="flex-row justify-between ">
                        {touched.firstName && errors.firstName && (
                          <Text className="text-red-500">
                            {errors.firstName}{" "}
                          </Text>
                        )}
                        {touched.lastName && errors.lastName && (
                          <Text className="text-red-500">
                            {errors.lastName}{" "}
                          </Text>
                        )}
                      </View>
                      <CustomInput
                        placeholder="Email"
                        value={values.email}
                        setValue={handleChange("email")}
                        handleBlur={() => setFieldTouched("email")}
                      />
                      {touched.email && errors.email && (
                        <Text className="text-red-500">{errors.email} </Text>
                      )}
                      <CustomInput
                        placeholder="Username"
                        value={values.username}
                        setValue={handleChange("username")}
                        handleBlur={() => setFieldTouched("username")}
                      />
                      {touched.username && errors.username && (
                        <Text className="text-red-500">{errors.username} </Text>
                      )}

                      <CustomInput
                        placeholder="Password"
                        value={values.password}
                        setValue={handleChange("password")}
                        handleBlur={() => setFieldTouched("password")}
                        secureTextEntry={true}
                      />
                      {touched.password && errors.password && (
                        <Text className="text-red-500">{errors.password} </Text>
                      )}

                      <CustomInput
                        placeholder="Retype Password"
                        value={values.passwordRepeat}
                        setValue={handleChange("passwordRepeat")}
                        handleBlur={() => setFieldTouched("passwordRepeat")}
                        //   hide password
                        secureTextEntry={true}
                      />
                      {touched.passwordRepeat && errors.passwordRepeat && (
                        <Text className="text-red-500">
                          {errors.passwordRepeat}{" "}
                        </Text>
                      )}

                      <View className="justify-center items-center mt-2 ">
                        <CustomButton
                          text="Register"
                          onPress={handleSubmit}
                          type="PRIMARY"
                          isValid={!isValid}
                        />

                        <Text className="my-[25px] text-gray-500">
                          By registering, you confirm that you accept our
                          <Text className="text-[#fdb075]">Terms</Text> of
                          <Text className="text-[#fdb075]">
                            Use and Privacy policy.
                          </Text>
                        </Text>
                      </View>
                    </>
                  )}
                </Formik>

                <View className="pb-5">
                  <CustomButton
                    text="Allready have an account? Sign In"
                    onPress={() => navigation.navigate("SignInScreen")}
                    type="TERITARY"
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default SignUpScreen;
