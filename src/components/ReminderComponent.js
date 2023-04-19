import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const ReminderComponent = ({ medicine, quantity, schedule, reminderId }) => {
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
};

export default ReminderComponent;
