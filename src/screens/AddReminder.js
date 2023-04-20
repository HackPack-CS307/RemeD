import { View, Text, ImageBackground } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackToLanding from "../components/BackToLanding";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import CustomInput from "../components/CustomInput";
import BgImg from "../../assets/images/medtrack.png";
import CustomButton from "../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// firebase

import { authentication, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// get uid and email after login
import UserContext from "../context/UserContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const AddReminder = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const { uid, setIsRemindersLoading } = useContext(UserContext);

  const [medicine, setMedicine] = useState("");
  const [schedule, setSchedule] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reminders, setReminders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleReminder = async () => {
    await addDoc(collection(db, "reminders"), {
      medicine_name: medicine,
      schedule: schedule,
      quantity: quantity,
      uid: uid,
    })
      .then(() => {
        const getReminders = async () => {
          try {
            const q = query(
              collection(db, "reminders"),
              where("uid", "==", uid)
            );
            const docSnap = await getDocs(q);
            const docCount = await getCountFromServer(q);
            if (reminders.length <= docCount.data().count) {
              docSnap.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const details = doc.data();
                reminders.push({
                  id: doc.id,
                  details,
                });
                // setReminders((list) => [...list, doc.data()]);
                // console.log(doc.id, " => ", doc.data());
              });
            }
            setReminders(reminders);
            console.log(reminders);

            setInterval(() => {
              setIsRemindersLoading(false);
            }, 2000);
          } catch (error) {
            console.error("Error getting user data:", error);
          }
        };

        getReminders();
        console.log("Reminder added on Firestore");
        setIsRemindersLoading(true);
        navigation.navigate("Medicine Tracker", {
          message: "Reminder added successfully!",
        });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const pullMe = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
      setMedicine(null);
    }, 2000);
  };

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <View className="absolute top-[60px] left-6 pb-5">
            <Text className=" font-semibold text-3xl">Add reminders for</Text>
            <Text className=" font-semibold text-3xl mb-3">Your Medicine</Text>
          </View>

          <ScrollView
            className="p-5 mt-[100px]"
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
            }
          >
            <View className="items-center justify-center bg-slate-200 rounded-full w-[80px] h-[80px] m-auto my-3">
              <MaterialCommunityIcons name="pill" size={70} color="black" />
            </View>
            <CustomInput
              placeholder="Medicine Name"
              setValue={setMedicine}
              value={medicine}
            />
            <CustomInput
              placeholder="Schedule (Ex: 6am / 12pm )"
              setValue={setSchedule}
              value={schedule}
            />
            <CustomInput
              placeholder="Quantity"
              setValue={setQuantity}
              value={quantity}
            />
            <View className="justify-center items-center mt-5 mb-5 pt-5">
              <CustomButton
                text="Add reminder"
                type="PRIMARY"
                onPress={handleReminder}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        <BackToLanding
          onPress={() => {
            navigation.navigate("Medicine Tracker");
          }}
        />
        <Toast />
      </ImageBackground>
    </>
  );
};

export default AddReminder;
