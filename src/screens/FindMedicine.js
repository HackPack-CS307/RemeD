import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import BgImg from "../../assets/images/medtrack.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LogoComponent from "../components/LogoComponent";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import { GOOGLE_PLACES_API } from "@env";
// toast notify
import Toast from "react-native-toast-message";

// google api
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// search bar
import { MultipleSelectList } from "react-native-dropdown-select-list";
import client from "../../sanity";
import UserContext from "../context/UserContext";

const MedicineTracker = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoComponent />,
    });
  }, []);
  const {
    setDrug,
    setSelected,
    setPickLocationLat,
    setPickLocationLong,
    setIsLoading,
  } = useContext(UserContext);

  // search query of drugs
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == 'drug'] {
      _id,drug_name
      }
    `
      )
      .then((data) => {
        let newArray = data.map((item) => {
          return { key: item._id, value: item.drug_name };
        });
        //Set Data Variable
        setSearchData(newArray);
        setDrug(data);
      });
  }, []);

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

  const handleRoute = () => {
    setIsLoading(true);
    navigation.navigate("PharmacyResult");
  };

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            <View className="p-5 mt-[100px]">
              <View className="px-2 items-center ">
                <Text className=" font-bold uppercase text-3xl">
                  Locate Your Medication
                </Text>
                <Text className=" mt-3 mb-3 text-lg">
                  Use RemeD advanced serch
                </Text>
              </View>
              <MultipleSelectList
                data={searchData}
                setSelected={setSelected}
                // onSelect={() => alert(selected)}
                placeholder="Search Your Medication"
                label="Search Your Medication"
                searchPlaceholder="Search Your Medication"
                notFoundText="Medication not found"
                save="value"
                boxStyles={{ backgroundColor: "white", borderColor: "white" }}
                maxHeight={250}
              />

              <View className="flex-row items-center bg-white rounded-xl px-1 shadow-lg mt-4 mb-2">
                <GooglePlacesAutocomplete
                  GooglePlacesDetailsQuery={{ fields: "geometry" }}
                  placeholder="Current Location or Custom Location"
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details?.geometry?.viewport);
                    setPickLocationLat(
                      details?.geometry?.viewport?.southwest?.lat
                    );
                    setPickLocationLong(
                      details?.geometry?.viewport?.southwest?.lng
                    );
                  }}
                  query={{
                    key: GOOGLE_PLACES_API,
                    language: "en",
                  }}
                />
              </View>

              <View className="justify-center items-center mt-2 ">
                <CustomButton
                  text="Route"
                  type="PRIMARY"
                  onPress={handleRoute}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default MedicineTracker;
