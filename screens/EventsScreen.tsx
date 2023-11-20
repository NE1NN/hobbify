import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../components/EventCard";
import { getEvents } from "../utils/api";
import { Event } from "../utils/api";
import UserEventCard from "../components/UserEventCard";
import { EventsTopBar } from "../components/EventsTopBar";

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
      <EventsTopBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: "white",
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
