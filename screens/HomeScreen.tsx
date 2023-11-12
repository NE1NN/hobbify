import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Welcome Back, User</Text>
      <Text>Recommendations</Text>
      <EventCard />
    </SafeAreaView>
  );
}

