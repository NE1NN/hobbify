import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome name="home" size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome name="search" size={size} />,
        }}
      />
      <Tab.Screen
        name="Event"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome name="calendar" size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome name="user" size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size }) => <FontAwesome name="cog" size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
