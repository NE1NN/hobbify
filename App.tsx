import { Settings, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventDetails from "./screens/Events/EventDetails";
import RatingScreen from "./screens/RatingScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  Register: undefined;
  Home: undefined;
  Login: undefined;
  Navbar: undefined;
  Settings: undefined;
  EventDetails: { id: string };
  RatingScreen: { id: number; eventId: number };
  CreateEvent: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tabs = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setLoggedin(Number(value));
      }
    };
    getUser();
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  const setLoggedin = (id: number) => {
    setUserId(id);
    setIsSignedIn(true);
  };

  const setLoggedOut = () => {
    setUserId(0);
    setIsSignedIn(false);
  };

  return (
    // <View>
    <AuthContext.Provider
      value={{
        userId: userId,
        setLoggedIn: setLoggedin,
        setLoggedOut: setLoggedOut,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          {isSignedIn ? (
            <>
              <Stack.Screen
                name="Navbar"
                component={Navbar}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="EventDetails" component={EventDetails} />
              <Stack.Screen name="RatingScreen" component={RatingScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
