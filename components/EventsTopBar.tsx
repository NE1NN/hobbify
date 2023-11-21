import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import History from "../screens/Events/Tabs/History";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Ongoing from "../screens/Events/Tabs/Ongoing";
import MyEvents from "../screens/Events/Tabs/MyEvents";

const Tab = createMaterialTopTabNavigator();

export function EventsTopBar() {
  return (
    <Tab.Navigator screenOptions={{}} style={styles.SafeAreaView}>
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Ongoing" component={Ongoing} />
      <Tab.Screen name="Interested" component={History} />
      <Tab.Screen name="My Events" component={MyEvents} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 60,
  },
});
