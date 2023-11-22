import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EventCard from "../../../components/EventCard";
import { Event, getEvents, getUpcomingEvents } from "../../../utils/api";

export default function Ongoing() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const populateEvents = async () => {
      const events = await getUpcomingEvents();
      setEvents(events);
      console.log(events)
    };
    populateEvents();

    const intervalId = setInterval(populateEvents, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Upcoming Events</Text>
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
    height: '100%'
  },
  sectionHeading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventsContainer: {
    gap: 10,
  },
  createEventButton: {
    marginVertical: 24,
    backgroundColor: "#28B67E",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  createEventText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
