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
import React, { useContext, useEffect, useState } from "react";
import {
  Event,
  User,
  getEvent,
  getUserData,
  joinEvent,
  likeEvent,
} from "../../utils/api";
import { FontAwesome } from "@expo/vector-icons";
import { timestampToString } from "../../utils/helpers";
import { Members } from "../../components/Member/Members";
import AuthContext from "../../AuthContext";
import defaultProfilePicture from "../../assets/icon.png";


export function EventDetails({ route }: { route: any }) {
  const id = route.params.id;

  const [event, setEvent] = useState<Event | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [liked, setLiked] = useState(false);
  const [joined, setJoined] = useState(false);

  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("No value");
  }

  const uId = contextValue.userId;

  const [memberData, setMemberData] = useState<User[]>([]); // State variable to store member data

  useEffect(() => {
    // Function to fetch member data
    const fetchMemberData = async () => {
      if (event) {
        const memberIds = event.members.slice(0, 5); // Get up to 5 member IDs
        const membersData: User[] = [];

        for (const memberId of memberIds) {
          const user = await getUserData(memberId);
          if (user) {
            membersData.push(user);
          }
        }

        setMemberData(membersData);
      }
    };

    fetchMemberData();
  }, [event]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const shortenDescription = (description: string) => {
    if (description.length > 100) {
      return `${description.substring(0, 100)}...`;
    }
    return description;
  };

  const handleLike = async () => {
    try {
      await likeEvent(id, uId);
      setLiked(!liked);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleJoin = async () => {
    try {
      await joinEvent(id, uId);
      setJoined(!joined);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };

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

  useEffect(() => {
    if (event && event.likes.includes(uId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    if (event && event.members.includes(uId)) {
      setJoined(true);
    } else {
      setJoined(false);
    }
  }, [event, uId]);

  if (!event) {
    return <Text>Loading...</Text>; // Loading state
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <Text style={styles.Title}>{event.name}</Text>
        <Image source={{ uri: event.thumbnail }} style={styles.Image} />

        {showMembers ? (
          <>
            <TouchableOpacity
              style={styles.CloseButton}
              onPress={handleShowMembers}
            >
              <FontAwesome name="close" size={25} color={"black"} />
            </TouchableOpacity>
            <Members eventId={id} />
          </>
        ) : (
          <View style={styles.DetailsContainer}>
            <View style={styles.SubtitleDescriptionContainer}>
              <Text style={styles.Subtitle}>About This Event</Text>
              <Text style={styles.Description}>
                {readMore
                  ? event.description
                  : shortenDescription(event.description)}
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

            <TouchableOpacity
              style={styles.MembersContainer}
              onPress={handleShowMembers}
            >
              <View style={styles.MemberTitleCountContainer}>
                <Text style={styles.MemberText}>Members</Text>
                <Text style={styles.MemberText}>
                  {event.members.length}/{event.membersLimit}
                </Text>
              </View>
              <View style={styles.IconsContainer}>
                {memberData.map((member, index) => (
                  <Image
                    key={index}
                    source={
                      member.profilePicture === undefined ||
                      member.profilePicture === null
                        ? defaultProfilePicture
                        : member.profilePicture
                    }                    style={styles.MemberProfilePicture}
                  />
                ))}
                {memberData.length < event.members.length && (
                  <Text style={styles.MemberText}>and More</Text>
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.LikeJoinContainer}>
              <TouchableOpacity style={styles.LikeButton} onPress={handleLike}>
                {liked ? (
                  <FontAwesome name="heart" size={41} color={"red"} />
                ) : (
                  <FontAwesome name="heart-o" size={41} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  joined ? styles.JoinButtonDeactivated : styles.JoinButton
                }
                onPress={handleJoin}
              >
                <Text style={styles.JoinText}>Join Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  SafeAreaView: {
    marginHorizontal: 25,
    marginTop: 30,
    height: "100%",
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
    width: "100%",
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
  JoinButtonDeactivated: {
    width: 240,
    height: 40,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#1D4C4F",
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
  },
  CloseButton: {
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  MemberProfilePicture: {
    width: 25,
    height: 25,
    borderRadius: 25
  }
});
