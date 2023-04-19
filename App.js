import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginProvider, { useLogin } from "./src/context/LoginProvider";
import MyDrawer from "./src/screens/Drawer";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./src/context/useAuth";
import UserContext from "./src/context/UserContext";

// urlsearcparam.set noy implement
import "react-native-url-polyfill/auto";

export default function App() {
  const Stack = createStackNavigator();
  const [userEmail, setUserEmail] = useState("");
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drug, setDrug] = useState("");
  const [selected, setSelected] = useState("");
  const [pickLocationLat, setPickLocationLat] = useState("");
  const [pickLocationLong, setPickLocationLong] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRemindersLoading, setIsRemindersLoading] = useState(true);

  // const { user } = useAuth();

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        uid,
        setUid,
        drug,
        setDrug,
        selected,
        setSelected,
        pickLocationLat,
        setPickLocationLat,
        pickLocationLong,
        setPickLocationLong,
        isLoading,
        setIsLoading,
        placeId,
        setPlaceId,
        isRemindersLoading,
        setIsRemindersLoading,
      }}
    >
      <NavigationContainer>
        {isLoggedIn ? (
          <MyDrawer />
        ) : (
          <>
            <Stack.Navigator>
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}
