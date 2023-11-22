import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import userIcon from "../assets/icon.png";
import { Event, User, getEvent, getUserData } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function UserEventCard({ uId, eventId }) {
  const [member, setMember] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  const fetchMemberAndEventData = async () => {
    try {
      setMember(await getUserData(uId));
      const snapshot = await getEvent(eventId.toString());
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

  useEffect(() => {
    fetchMemberAndEventData();
  }, []);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "RatingScreen">
    >();

  const handlePress = async () => {
    // console.log("eventId member", eventId);
    navigation.navigate("RatingScreen", { id: uId, eventId: eventId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={userIcon} style={styles.userImage} />
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userName}>{member?.username}</Text>
        <Text style={styles.userDescription}>From {event?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  userImage: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    marginRight: 27,
  },
  userName: {
    fontSize: 24,
  },
  userDescription: {
    fontSize: 15,
  },
  userDetailsContainer: {
    flexDirection: "column",
  },
});
