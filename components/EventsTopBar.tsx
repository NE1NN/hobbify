import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import History from "../screens/Events/History";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

export function EventsTopBar() {
  return (
    <Tab.Navigator screenOptions={{}} style={styles.SafeAreaView}>
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Ongoing" component={History} />
      <Tab.Screen name="Intrested" component={History} />
      <Tab.Screen name="My Events" component={History} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 60,
  },
});
