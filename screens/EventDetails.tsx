import { Button, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Event, getEvent } from "../utils/api";
import { FontAwesome } from "@expo/vector-icons";

export function EventDetails(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const shortenDescription = (description: string) => {
    if (description.length > 100) {
      return `${description.substring(0, 100)}...`;
    }
    return description;
  };

  const handleLike = () => {}

  const handleJoin = () => {}

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
      <Image source={{ uri: event.thumbnail }}></Image>
      <View>
        <Text>About This Event</Text>
        <Text>
          {" "}
          {readMore ? event.description : shortenDescription(event.description)}
        </Text>
        <Button
          title={readMore ? "Read Less" : "Read More"}
          onPress={handleReadMore}
        />
      </View>
      <View>
        <FontAwesome name="calendar" />
        <Text>{event.date.toLocaleDateString()}</Text>
        <Text>{event.time.toString()}</Text>
      </View>
      <View>
      <FontAwesome name="map-marker" />
        <Text>{event.location}</Text>
      </View>
      <View>
        <Text>Members</Text>
        <Text>2/20</Text>
        <Text>Icons</Text>
        <Text>and More</Text>
      </View>
      <View>
        <Button title={"Like"} onPress={handleLike}/>
        <Button title={"Join"} onPress={handleJoin}/>
      </View>
    </View>
  );
}
