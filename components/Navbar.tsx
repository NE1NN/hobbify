import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } 

          return (
            <FontAwesome name={iconName as any} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => {
            return <FontAwesome name="home" size={size} />;
          },
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
