import { View, Text, ImageBackground } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BackToLanding from "../components/BackToLanding";
import BgImg from "../../assets/images/medtrack.png";

import { GOOGLE_PLACES_API } from "@env";
import UserContext from "../context/UserContext";

const MapScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const destinationLat = route?.params?.destinationLat;
  const destinationLong = route?.params?.destinationLong;
  const pharmacy_name = route?.params?.name;
  const address = route?.params?.address;
  const originLat = route?.params?.originLat;
  const originLong = route?.params?.originLong;
  const originPlaceId = route?.params?.originPlaceId;

  const origin = { latitude: originLat, longitude: originLong };
  const destination = { latitude: destinationLat, longitude: destinationLong };
  const mapRef = useRef(null);

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const query = `https://maps.googleapis.com/maps/api/distancematrix/json?units=standard&destinations=${destinationLat}%2C${destinationLong}&origins=${originLat}%2C${originLong}&key=${GOOGLE_PLACES_API}`;

  // fetch distance time and set markers fit to screen
  useEffect(() => {
    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        setDistance(data.rows[0].elements[0].distance.text);
        setDuration(data.rows[0].elements[0].duration.text);
      });

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin]);

  return (
    <>
      <ImageBackground source={BgImg} className="h-[100%] ">
        <SafeAreaView className="flex-1">
          <StatusBar hidden={false} />
          <View className="h-5/6 p-1">
            <MapView
              ref={mapRef}
              className="w-[100%] h-[100%] z-0"
              initialRegion={{
                latitude: destinationLat,
                longitude: destinationLong,
                latitudeDelta: 0.0008,
                longitudeDelta: 0.0008,
              }}
            >
              <Marker
                coordinate={origin}
                title="Starting point"
                description="You starts from here."
                identifier="origin"
              />
              <Marker
                coordinate={destination}
                title={pharmacy_name}
                description={address}
                identifier="destination"
              />
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_PLACES_API}
                strokeWidth={3}
                mode="WALKING"
              />
            </MapView>
          </View>
          <View className="z-10 flex-row px-2 py-1">
            <View className="flex-1 bg-slate-300 rounded-full py-3 mx-1">
              <Text className="px-2 font-semibold">
                Distance : <Text className="font-medium">{distance} </Text>
              </Text>
            </View>
            <View className="flex-1 bg-slate-300 rounded-full py-3 mx-1">
              <Text className="px-2 font-semibold">
                Duration : <Text className="font-medium">{duration} </Text>
              </Text>
            </View>
          </View>
          <View className="absolute bottom-0">
            <BackToLanding
              onPress={() => {
                navigation.navigate("PharmacyResult");
              }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default MapScreen;
