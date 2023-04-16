import {
  View,
  Text,
  ImageBackground,
  Image,
  Button,
  Touchable,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/profile.png";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import LogoComponent from "../components/LogoComponent";
import BackToLanding from "../components/BackToLanding";
import { Feather } from "@expo/vector-icons";
import NotFound from "../../assets/images/NotFound.png";

// date picker
import DateTimePicker from "@react-native-community/datetimepicker";

// dropdown
import DropDownPicker from "react-native-dropdown-picker";

// firebase

import { authentication, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// get uid and email after login
import UserContext from "../context/UserContext";
import Loading from "../components/CustomLoading";

const Profile = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoComponent />,
    });
  }, []);

  const { uid, setUid } = useContext(UserContext);
  const { userEmail, setUserEmail } = useContext(UserContext);
  const [userData, setUserData] = useState("");

  const [user, setUser] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  // const [selectedDate, setSelectedDate] = useState("");
  // date picker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setFirstName(docSnap.data().firstName);
          setLastName(docSnap.data().lastName);
          setUsername(docSnap.data().username);
          setDob(docSnap.data().dob);
          setGender(docSnap.data().gender);
          setEmail(userEmail);
        } else {
          // doc.data() will be undefined in this case
          setUserData(null);
          console.log("No such document!");
        }
        // setUserData(docSnap.data());
        setUser({ uid, userEmail });
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    if (uid) {
      getUserData();
    }
  }, [uid]);

  // date picker toggle
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDob(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIosDate = () => {
    setDob(date.toDateString());
    toggleDatePicker();
  };

  // gender dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ]);

  const handleUpdate = async () => {
    await updateDoc(doc(db, "users", uid), {
      firstName: firstName,
      lastName: lastName,
      username: username,
      dob: dob,
      gender: gender,
    })
      .then(() => {
        console.log("User details updated on Firestore");
        navigation.navigate("FindMedicine", {
          message: "User details updated successfully!",
        });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <ScrollView className="p-5 mt-[100px]">
            <View className=" items-start">
              <Text className="text-[#0d0d0e]  font-bold text-4xl">
                Edit your profile
              </Text>
            </View>
            <View className="items-center justify-center bg-slate-300 rounded-full w-[80px] h-[80px] m-auto my-3">
              <Feather name="user" size={70} color="black" />
            </View>
            <View>
              {userData ? (
                <>
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
                    value={userEmail}
                    setValue={setEmail}
                    editable={false}
                  />
                  <View className="flex-row">
                    <View className="flex-1">
                      {showPicker && (
                        <DateTimePicker
                          mode="date"
                          display="spinner"
                          value={date}
                          onChange={onChange}
                        />
                      )}
                      {Platform.OS === "ios" && (
                        <View className="flex-row justify-around">
                          <CustomButton
                            text="Cancel"
                            type="TERITARY"
                            onPress={toggleDatePicker}
                          />
                          <CustomButton
                            text="Confirm"
                            type="PRIMARY"
                            onPress={confirmIosDate}
                          />
                        </View>
                      )}
                      <TouchableOpacity
                        onPress={toggleDatePicker}
                        onPressIn={toggleDatePicker}
                      >
                        <CustomInput
                          placeholder="Date of Birth"
                          value={dob}
                          setValue={setDob}
                          type="HALF"
                          editable={false}
                          onPressIn={toggleDatePicker}
                        />
                      </TouchableOpacity>
                    </View>
                    <CustomInput
                      placeholder="Gender"
                      value={gender}
                      setValue={setGender}
                      type="HALF"
                    />
                    {/* <View className="flex-1">
                      <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                      />
                    </View> */}
                  </View>
                </>
              ) : (
                <Loading />
              )}
            </View>

            <View className="justify-center items-center mt-5 mb-5 pt-5">
              <CustomButton text="Edit" type="PRIMARY" onPress={handleUpdate} />
            </View>
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

export default Profile;
