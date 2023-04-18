import { View, Text, Platform, Linking } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
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
      <View className="h-[85px] rounded-2xl bg-white ">
        <View className="flex-row items-center justify-between p-2 pb-1">
          <View className=" flex-col">
            <Text className="font-semibold text-base">{pharmacy_name} </Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity
              className="rounded-full bg-blue-200 h-[30px] w-[30px] items-center justify-center flex-col ml-4"
              onPress={() => makePhoneCall(contact)}
            >
              <Feather name="phone-call" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-xl w-[100px] h-8  bg-slate-300 items-center justify-starts flex-col ml-4"
              onPress={handleNavigation}
            >
              <Text className="">
                {distance} {"km "}
                <FontAwesome name="map-marker" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-2 pt-0 flex-row items-center justify-between">
          <View className=" w-5/6">
            <Text>Address : {address} </Text>
          </View>
          <View>
            <Text>
              <FontAwesome name="star-o" size={15} color="gray" /> {rating}{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PharmacyComponent;
