import { View, Text, Platform, Linking } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const PharmacyComponent = ({
  pharmacy_name,
  distance,
  contact,
  rating,
  address,
  handleNavigation,
}) => {
  const makePhoneCall = (contact) => {
    if (Platform.OS === "android") {
      Linking.openURL("tel: " + contact);
    } else {
      Linking.openURL("tel:// " + contact);
    }
  };
  return (
    <View className="pb-3">
      <View className="h-[87px] rounded-2xl bg-white">
        <View className="flex-row items-center justify-between p-2 pb-1">
          <View className=" flex-col">
            <Text className="font-semibold text-base">{pharmacy_name} </Text>
          </View>
          <TouchableOpacity
            className="rounded-xl w-[100px] h-8  bg-slate-300 items-center justify-starts"
            onPress={handleNavigation}
          >
            <Text className="">
              {distance} {"km "}
              <FontAwesome name="map-marker" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="px-2 pt-0 flex-row items-center justify-between">
          <TouchableOpacity
            className="bg-blue-300 rounded-full p-1"
            onPress={() => makePhoneCall(contact)}
          >
            <Text>Contact pharmacy </Text>
          </TouchableOpacity>
          <View>
            <Text>
              <FontAwesome name="star-o" size={15} color="gray" /> {rating}{" "}
            </Text>
          </View>
        </View>
        <View className="pt-0 px-2">
          <Text>Address : {address} </Text>
        </View>
      </View>
    </View>
  );
};

export default PharmacyComponent;
