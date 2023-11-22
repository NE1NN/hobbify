import React, { useContext, useEffect, useState } from "react";
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
import {
  Event,
  User,
  getEvents,
  populateReviewUsers,
} from "../../../utils/api";
// import UserEventCard from "../../../components/UserEventCard";
import { RootStackParamList } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthContext from "../../../AuthContext";
import UserEventCard from "../../../components/UserEventCard";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "History">;

export default function History({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<{ user: User; eventId: string }[]>([]);
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("No value");
  }

  const handleCreateEvent = () => {
    // TODO
    navigation.navigate("CreateEvent");
  };

  useEffect(() => {
    const populateEvents = async () => {
      const events = await getEvents();
      setEvents(events);
    };
    populateEvents();

    const getReviewUsers = async () => {
      const usersData = await populateReviewUsers(contextValue.userId);
      setUsers(usersData);
    };
    getReviewUsers();

    const intervalId = setInterval(populateEvents, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getReviewUsers = async () => {
        const usersData = await populateReviewUsers(contextValue.userId);
        setUsers(usersData);
      };
      getReviewUsers();
    }, [])
  );

  useEffect(() => {
    console.log('user',users)
  }, [users]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.createEventButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createEventText}>Create an Event</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>Review Users</Text>
        <View>
          {users.map((user, idx) => (
            <UserEventCard
              key={idx}
              // Pass the relevant user data as props to the UserEventCard component
              uId={user.user.userId}
              eventId={user.eventId}
              // Add any other props you need to pass here
            />
          ))}
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
