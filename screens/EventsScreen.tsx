import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

        <TouchableOpacity style={styles.createEventButton}>
          <Text style={styles.createEventText}>Create an Event</Text>
        </TouchableOpacity>


        <Text style={styles.sectionHeading}>Review Users</Text>
        <View>
          <UserEventCard/>
          <UserEventCard/>
          <UserEventCard/>
        </View>


        <Text style={styles.sectionHeading}>Past Events</Text>
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
  sectionHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventsContainer: {
    gap: 10,
  },
  createEventButton: {
    backgroundColor: "#28B67E",
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createEventText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  }
});
