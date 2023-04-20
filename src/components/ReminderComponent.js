import { View, Text } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function ReminderComponent({ medicine, quantity, schedule, reminderId }) {
  // delete reminder
  const deleteReminder = async (reminderId) => {
    await deleteDoc(doc(db, "reminders", reminderId));
    console.log("deleted");
    Toast.show({
      type: "success",
      text1: "Reminder deleted",
      position: "top-right",
      visibilityTime: 5000,
    });

    const [reminders, setReminders] = useState([]);

    const getReminders = async () => {
      try {
        const q = query(collection(db, "reminders"), where("uid", "==", uid));
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
  };

  return (
    <View className="bg-slate-50 h-[85px] rounded-2xl px-5 py-2 mt-2">
      <Text className="font-semibold text-lg">{medicine}</Text>
      <View className="flex-row justify-between">
        <View className="flex-col">
          <Text>Scheduled : {schedule}</Text>
          <Text>Quantity : {quantity} </Text>
        </View>
        <TouchableOpacity
          className="flex-col"
          onPress={() => deleteReminder(reminderId)}
        >
          <Entypo name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ReminderComponent;
