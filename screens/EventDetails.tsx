import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Event, getEvent } from "../utils/api";
import { FontAwesome } from "@expo/vector-icons";
import { timestampToString } from "../utils/helpers";

export function EventDetails({ route }: { route: any }) {
  const id = route.params.id;

  const [event, setEvent] = useState<Event | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [showMembers, setShowMembers] = useState(false)

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const shortenDescription = (description: string) => {
    if (description.length > 100) {
      return `${description.substring(0, 100)}...`;
    }
    return description;
  };

  const handleLike = () => {
    // TODO
  };

  const handleJoin = () => {
    // TODO
  };

  const handleShowMembers = () => {

  }

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
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <Text style={styles.Title}>{event.name}</Text>
        <View style={styles.DetailsContainer}>
          <Image source={{ uri: event.thumbnail }} style={styles.Image} />
          <View style={styles.SubtitleDescriptionContainer}>
            <Text style={styles.Subtitle}>About This Event</Text>
            <Text style={styles.Description}>
              {readMore ? event.desc : shortenDescription(event.desc)}
            </Text>
            <TouchableOpacity onPress={handleReadMore}>
              <Text style={styles.ReadMore}>
                {readMore ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.DateLocationContainer}>
            <View style={styles.DateContainer}>
              <FontAwesome name="calendar" style={styles.DateIcon} />
              <View>
                <Text style={styles.DateText}>
                  {timestampToString(event.time, "date")}
                </Text>
                <Text style={styles.TimeText}>
                  at {timestampToString(event.time, "time")}
                </Text>
              </View>
            </View>
            <View style={styles.DateContainer}>
              <FontAwesome name="map-marker" style={styles.MapIcon} />
              <Text style={styles.DateText}>{event.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.MembersContainer} onPress={handleShowMembers}>
            <View style={styles.MemberTitleCountContainer}>
              <Text style={styles.MemberText}>Members</Text>
              <Text style={styles.MemberText}>2/20</Text>
            </View>
            <View style={styles.IconsContainer}>
              <Text>Icons</Text>
              <Text style={styles.MemberText}>and More</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.LikeJoinContainer}>
            <TouchableOpacity style={styles.LikeButton} onPress={handleLike}>
              <FontAwesome name="heart" size={41} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.JoinButton} onPress={handleJoin}>
              <Text style={styles.JoinText}>Join Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 25,
    marginTop: 30,
    height: '100%'
  },
  DetailsContainer: {
    alignItems: "center",
  },
  Title: {
    marginVertical: 16,
    fontSize: 30,
    fontWeight: "700",
  },
  SubtitleDescriptionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  Subtitle: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: "700",
  },
  Image: {
    width: 400,
    height: 200,
    resizeMode: "cover",
    borderRadius: 25,
  },
  Description: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 15,
  },
  ReadMore: {
    color: "#0000FF",
    fontSize: 15,
    fontWeight: "600",
  },
  DateLocationContainer: {
    alignItems: "flex-start",
  },
  DateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  DateIcon: {
    fontSize: 32,
    marginRight: 10,
  },
  DateText: {
    fontSize: 30,
    fontWeight: "400",
  },
  TimeText: {
    fontSize: 24,
    fontWeight: "400",
  },
  MapIcon: {
    fontSize: 32,
    marginLeft: 10,
    marginRight: 10,
  },
  LikeJoinContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  MembersContainer: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#1D4C4F",
    padding: 15,
    color: "white",
  },
  MemberTitleCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  MemberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  IconsContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  JoinButton: {
    width: 240,
    height: 40,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#28B67E",
  },
  LikeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  JoinText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  }
});
