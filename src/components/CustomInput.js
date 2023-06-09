import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  type,
  handleBlur,
  editable,
  onPressIn,
  autoCapitalize,
}) => {
  return (
    <View
      className={`${
        type == "HALF" ? "flex-1 mr-1" : "flex"
      } mt-3 px-0 flex-row bg-white rounded-xl shadow-lg`}
    >
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onPressIn={onPressIn}
        onBlur={handleBlur}
        autoCapitalize={autoCapitalize}
        className={`${
          type == "HALF" ? "flex-row" : ""
        }  border-1 border-[#313030] rounded bg-white px-2 py-2 text-lg w-[100%]`}
      />
    </View>
  );
};

export default CustomInput;
