import { Button, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Event, getEvent } from "../utils/api";

export function EventDetails(id: string) {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const retrieveEvent = async () => {
      try {
        const snapshot = await getEvent(id);
        if (snapshot.exists()) {
          const eventData = snapshot.data() as Event;
          setEvent(eventData);
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
      <Text>{event.name}</Text>
      <Image source={{uri: event.thumbnail}}></Image>
      <View>
        <Text>About This Event</Text>
        <Text>Description</Text>
        <Button>Read More</Button>
      </View>
      <View>
        <Text>Icon</Text>
        <Text>Date</Text>
        <Text>Time</Text>
      </View>
      <View>
        <Text>Icon</Text>
        <Text>Location</Text>
      </View>
      <View>
        <Text>Members</Text>
        <Text>2/20</Text>
        <Text>Icons</Text>
        <Text>and More</Text>
      </View>
      <View>
        <Button>Like</Button>
        <Button>Join</Button>
      </View>
    </View>
  );
}
