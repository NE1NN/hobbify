import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event, getEvent } from "../utils/api";
import { Member } from "./Member";

export function Members({ eventId }: { eventId: number }) {
  const id = eventId.toString();

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const retrieveEvent = async () => {
      try {
        const snapshot = await getEvent(id);

        console.log(snapshot);

        const eventData = snapshot.data() as Event;
        setEvent(eventData);
      } catch (error) {
        console.error("error:", error);
      }
    };
    retrieveEvent();
  }, [id]);

  if (!event) {
    return <Text>Loading...</Text>; // Loading state
  }

  return (
    <View style={styles.Container}>
      <View style={styles.MemberTitleCountContainer}>
        <Text style={styles.MemberText}>Members</Text>
        <Text style={styles.MemberText}>
          {event.members.length}/{event.membersLimit}
        </Text>
      </View>
      {event.members.map((memberId) => (
        <Member key={memberId} uId={memberId} /> // Render Member component for each member ID
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "#1D4C4F",
    width: "100%",
    padding: 20,
  },
  MemberTitleCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  MemberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
