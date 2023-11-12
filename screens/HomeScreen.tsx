import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getUsers } from '../utils/helper';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back,</Text>
        <Text style={styles.welcomeText}>User</Text>
      </View>
      <Text style={styles.recommendations}>Recommendations</Text>
      <EventCard />
      <Button title='test' onPress={getUsers}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 25,
    marginTop: 30,
  },
  welcomeContainer: {
    marginBottom: 10
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  recommendations: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
});
