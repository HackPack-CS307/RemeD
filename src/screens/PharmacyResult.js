import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BgImg from "../../assets/images/medtrack.png";
import LogoComponent from "../components/LogoComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import UserContext from "../context/UserContext";
import client from "../../sanity";
import BackToLanding from "../components/BackToLanding";
import PharmacyComponent from "../components/PharmacyComponent";
import Loading from "../components/CustomLoading";
import NotFound from "../../assets/images/NotFound.png";

const PharmacyResult = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const {
    selected,
    pickLocationLat,
    pickLocationLong,
    isLoading,
    setIsLoading,
    placeId,
  } = useContext(UserContext);

  const [pharmacy, setPharmacy] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const selectedDrugs = selected.map((value) => `"${value}"`).join(" || ");
  const query = `
  *[_type == 'pharmacy' && geo::distance(geo::latLng(${pickLocationLat}, ${pickLocationLong}),geo::latLng(lat, long)) <5000 ] {
    'distance':geo::distance(geo::latLng(${pickLocationLat}, ${pickLocationLong}),geo::latLng(lat, long)) / 1000,
    available_drugs[]->{drug_name},
    lat,
    long,
    pharmacy_name,
    address,
    contact_no,
    rating,
    _id
  }[ ${selectedDrugs} in available_drugs[].drug_name] | order(distance asc)
`;

  useEffect(() => {
    setIsLoading(true);
    client
      .fetch(query, {
        pickLocationLat: pickLocationLat,
        pickLocationLong: pickLocationLong,
        selectedDrugs: selectedDrugs,
      })
      .then((data) => {
        setPharmacy(data);
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
  }, [query]);
  // console.log(pickLocationLat, placeId);

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1 ">
          <StatusBar hidden={false} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="p-5 flex-1"
          >
            <View className="flex-1">
              <View className="items-center justify-center pb-5">
                <Text className=" font-normal text-lg">
                  Navigate Fast with{" "}
                  <Text className=" text-blue-800 text-2xl font-medium">
                    RemeD{" "}
                  </Text>
                  and collect your Medications
                </Text>
              </View>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {pharmacy?.length > 0 ? (
                    <>
                      {pharmacy?.map((pharmacy) => (
                        <PharmacyComponent
                          key={pharmacy._id}
                          pharmacy_name={pharmacy.pharmacy_name}
                          distance={pharmacy.distance.toFixed(3)}
                          contact={pharmacy.contact_no}
                          rating={pharmacy.rating}
                          address={pharmacy.address}
                          handleNavigation={() => {
                            navigation.navigate("MapScreen", {
                              destinationLat: pharmacy.lat,
                              destinationLong: pharmacy.long,
                              name: pharmacy.pharmacy_name,
                              address: pharmacy.address,
                              originLat: pickLocationLat,
                              originLong: pickLocationLong,
                              originPlaceId: placeId,
                            });
                          }}
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
                          Oops.. No pharmacies found having the Medications you
                          need within the range.
                        </Text>
                      </View>
                    </>
                  )}
                </>
              )}
            </View>
          </ScrollView>
          <BackToLanding
            onPress={() => {
              navigation.navigate("FindMedicine");
            }}
          />
        </SafeAreaView>
        <Toast />
      </ImageBackground>
    </>
  );
};

export default PharmacyResult;
