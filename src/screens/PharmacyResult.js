import { View, Text, ImageBackground } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BgImg from "../../assets/images/medtrack.png";
import LogoComponent from "../components/LogoComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import UserContext from "../context/UserContext";
import client from "../../sanity";
import BackToLanding from "../components/BackToLanding";

const PharmacyResult = ({ navigation }) => {
  const { drug, selected, pickLocationLat, pickLocationLong } =
    useContext(UserContext);

  const [pharmacy, setPharmacy] = useState("");
  const selectedDrugs = selected.map((value) => `"${value}"`).join(" || ");
  const query = `
  *[_type == 'pharmacy' && geo::distance(geo::latLng(${pickLocationLat}, ${pickLocationLong}),geo::latLng(lat, long)) < 5000 ] {
    'distance':geo::distance(geo::latLng(${pickLocationLat}, ${pickLocationLong}),geo::latLng(lat, long)),
    available_drugs[]->{drug_name},
    pharmacy_name,
    address,
    contact_no,
    _id
  }[ ${selectedDrugs} in available_drugs[].drug_name] | order(distance asc)
`;

  useEffect(() => {
    client
      .fetch(query, {
        pickLocationLat: pickLocationLat,
        pickLocationLong: pickLocationLong,
        selectedDrugs: selectedDrugs,
      })
      .then((data) => {
        setPharmacy(data);
      });
  }, []);

  // {
  //     pharmacy?.map(
  //       (pharmacy) => setPharmacyAvailableDrugs(pharmacy.available_drugs),
  // console.log(pharmacyAvailableDrugs)
  //     );
  //   }
  //
  console.log(pickLocationLat, pickLocationLong, selectedDrugs, pharmacy);

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <LogoComponent />
          <ScrollView showsVerticalScrollIndicator={false} className="p-5">
            <View>
              <Text>PharmacyResult</Text>
              {/* <Text>{drug} </Text>
              <Text>{pharmacyAvailableDrugs} </Text> */}
            </View>
            <BackToLanding
              onPress={() => {
                navigation.navigate("FindMedicine");
              }}
            />
          </ScrollView>
        </SafeAreaView>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default PharmacyResult;
