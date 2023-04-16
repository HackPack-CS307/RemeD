import { View, Text, Button } from "react-native";
import React, { useContext } from "react";

import { authentication } from "../../firebase";
import { signOut } from "firebase/auth";
import UserContext from "../context/UserContext";

import Dialog, { DialogTitle, DialogContent } from "react-native-popup-dialog";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

const Logout = () => {
  const { setIsLoggedIn } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        console.log("Sign-out successful");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };

  handleSignOut();
};

export default Logout;
