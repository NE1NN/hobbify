import { Settings, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    // <View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Navbar"
          component={Navbar}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

// import Ionicons from "@expo/vector-icons/Ionicons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from './screens/HomeScreen';

// const Tabs = createBottomTabNavigator();
// const RootStack = createNativeStackNavigator();

// export default function App() {
//   const BottomTabs = () => (
//     <Tabs.Navigator screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="Notes"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ size }) => (
//             <Ionicons name="md-document-text" size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Settings"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ size }) => <Ionicons name="md-settings" size={size} />,
//         }}
//       />
//     </Tabs.Navigator>
//   );

//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         <RootStack.Screen
//           name="Tabs"
//           component={BottomTabs}
//           options={{ headerShown: false }}
//         />
//         <RootStack.Screen
//           name="Detail"
//           component={HomeScreen}
//           options={{ headerBackTitle: "Back" }}
//         />
//         <RootStack.Screen
//           name="Create"
//           component={HomeScreen}
//           options={{ presentation: "modal" }}
//         />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }
