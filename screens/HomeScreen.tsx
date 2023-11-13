import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/api';
import { Event } from '../utils/api';

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const populateEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };
    populateEvents();
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.welcomeText}>User</Text>
        </View>
        <Text style={styles.recommendations}>Recommendations</Text>
        <View style={styles.eventsContainer}>
          {events.map((event, idx) => (
            <EventCard
              key={idx}
              name={event.name}
              location={event.location}
              thumbnail={event.thumbnail}
              time={event.time}
              eventId={event.eventId}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 25,
    marginTop: 30,
  },
  welcomeContainer: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  recommendations: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventsContainer: {
    gap: 10,
  },
});
