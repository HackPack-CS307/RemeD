import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import CustomDrawer from "../components/CustomDrawer";
import UserContext from "../context/UserContext";

// icons
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// sub menues
import Profile from "./Profile";
import SearchHistory from "./SearchHistory";
import StarredPharmacies from "./StarredPharmacies";
import Feedback from "./Feedback";
import MedicineTracker from "./MedicineTracker";
import PrescriptionReader from "./PrescriptionReader";
import Logout from "./Logout";
import FindMedicine from "./FindMedicine";
import PharmacyResult from "./PharmacyResult";
import Map from "./MapScreen";
import MapScreen from "./MapScreen";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const { setIsLoggedIn, isLoggedIn } = useContext(UserContext);
  return (
    <>
      {isLoggedIn && (
        <Drawer.Navigator
          screenOptions={{
            headerShown: true,
            headerTitle: "",
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              shadowOpacity: 0,
            },
            drawerStyle: {
              height: "100%",
              resizeMode: "cover",
            },

            headerTransparent: true,
          }}
          initialRouteName="FindMedicine"
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            name="FindMedicine"
            component={FindMedicine}
            options={{
              title: "FindMedicine",
              drawerIcon: ({ focused, size }) => (
                <AntDesign name="poweroff" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
              drawerIcon: ({ focused, size }) => (
                <Feather name="user" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 7,
                marginTop: 70,
              },
            }}
          />
          <Drawer.Screen
            name="Search History"
            component={SearchHistory}
            options={{
              title: "Search History",
              drawerIcon: ({ focused, size }) => (
                <Feather name="clock" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="Starred Pharmacies"
            component={StarredPharmacies}
            options={{
              title: "Starred Pharmacies",
              drawerIcon: ({ focused, size }) => (
                <Feather name="star" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="Feedback"
            component={Feedback}
            options={{
              title: "Feedback",
              drawerIcon: ({ focused, size }) => (
                <Octicons name="checklist" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="Medicine Tracker"
            component={MedicineTracker}
            options={{
              title: "Medicine Tracker",
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons name="pill" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="Prescription Reader"
            component={PrescriptionReader}
            options={{
              title: "Prescription Reader",
              drawerIcon: ({ focused, size }) => (
                <MaterialCommunityIcons
                  name="google-lens"
                  size={24}
                  color="black"
                />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={Logout}
            options={{
              title: "Logout",
              drawerIcon: ({ focused, size }) => (
                <AntDesign name="poweroff" size={24} color="black" />
              ),
              drawerItemStyle: {
                paddingVertical: 5,
              },
            }}
          />
          <Drawer.Screen
            name="PharmacyResult"
            component={PharmacyResult}
            options={{
              title: "PharmacyResult",
              drawerItemStyle: {
                paddingVertical: 5,
                display: "none",
              },
            }}
          />
          <Drawer.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              title: "MapScreen",
              drawerItemStyle: {
                paddingVertical: 5,
                display: "none",
              },
            }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
};

export default MyDrawer;
