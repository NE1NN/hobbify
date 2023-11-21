import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Event, getEvent } from "../utils/api";
import { Member } from "./Member";

export function Members({ eventId }: { eventId: number }) {
  const id = eventId.toString()

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const retrieveEvent = async () => {
      try {
        const snapshot = await getEvent(id);
        if (snapshot.exists()) {
          const eventData = snapshot.data() as Event;
          setEvent(eventData);
          console.log(eventData);
        } else {
          console.log("no event");
        }
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
    <View>
      {event.members.map((memberId) => (
        <Member key={memberId} uId={memberId} /> // Render Member component for each member ID
      ))}
    </View>
  );
}
