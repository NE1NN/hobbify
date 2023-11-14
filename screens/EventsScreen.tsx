import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getEvents } from '../utils/api';
import { Event } from '../utils/api';
import UserEventCard from '../components/UserEventCard';

export default function EventsScreen() {
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

        <Text style={styles.recommendations}>Review Users</Text>
        <View>
          <UserEventCard/>
        </View>


        <Text style={styles.recommendations}>Past Events</Text>
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
