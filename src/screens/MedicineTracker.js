import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import BgImg from "../../assets/images/medtrack.png";
import BackToLanding from "../components/BackToLanding";
import ReminderComponent from "../components/ReminderComponent";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NotFound from "../../assets/images/NotFound.png";

// firebase

import { db } from "../../firebase";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import UserContext from "../context/UserContext";
import Loading from "../components/CustomLoading";
import { useRoute } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const MedicineTracker = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const [firstName, setFirstName] = useState("");

  const { uid, isRemindersLoading, setIsRemindersLoading } =
    useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight: () => <LogoComponent />,
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        // setUserData(docSnap.data());
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    if (uid) {
      getUserData();
    }
  }, [uid]);

  const q = query(collection(db, "reminders"), where("uid", "==", uid));

  useEffect(() => {
    setIsRemindersLoading(true);
    const getReminders = async () => {
      try {
        const docSnap = await getDocs(q);
        const docCount = await getCountFromServer(q);
        if (reminders.length < docCount.data().count) {
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
  }, [uid]);

  // reminder added notification
  const route = useRoute();

  useEffect(() => {
    if (route.params && route.params.message) {
      Toast.show({
        type: "success",
        text1: route.params.message,
        visibilityTime: 5000,
      });
    }
  }, [route.params]);

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <View className="absolute top-[50px] left-6 pb-5">
            <View className="flex-row justify-between pr-4">
              <Text className=" text-lg mb-3 w-5/6">Hello {firstName} </Text>
              <Ionicons name="notifications-outline" size={35} color="black" />
            </View>

            <Text className=" font-semibold text-3xl">Your Medicine</Text>
            <Text className=" font-semibold text-3xl mb-3">Schedule</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-5 mt-[100px] pt-8"
          >
            {isRemindersLoading ? (
              <Loading />
            ) : (
              <>
                {reminders?.length > 0 ? (
                  <>
                    {reminders?.map((reminders) => (
                      <ReminderComponent
                        key={reminders.id}
                        medicine={reminders?.details?.medicine_name}
                        quantity={reminders?.details?.quantity}
                        schedule={reminders?.details?.schedule}
                        reminderId={reminders.id}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <View className="w-full h-[400px] items-center space-y-8 justify-center ">
                      <Image
                        source={NotFound}
                        className="w-32 h-32 object-cover"
                      />
                      <Text className="text-xl font-semibold text-[#428288] p-5 ">
                        Oops.. Seems like you don't have any reminders yet.
                      </Text>
                    </View>
                  </>
                )}
              </>
            )}
          </ScrollView>
          <View className="flex-row">
            <View className="flex-1">
              <BackToLanding
                onPress={() => {
                  navigation.navigate("FindMedicine");
                }}
              />
            </View>
            <View className="flex-1 items-end pr-5">
              <TouchableOpacity
                onPress={() => navigation.navigate("AddReminder")}
                className="w-[45px] h-[45px] rounded-full bg-black items-center justify-center "
              >
                <AntDesign name="plus" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default MedicineTracker;
