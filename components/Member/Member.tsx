import { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Event,
  User,
  getEvent,
  getUserData,
  getUserDetail,
} from "../../utils/api";
import React from "react";
import defaultProfilePicture from "../../assets/icon.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/core";
import AuthContext from "../../AuthContext";
import { useFocusEffect } from "@react-navigation/native";

interface MemberProps {
  uId: number;
  eventId: number;
}

export function Member({ uId, eventId }: MemberProps) {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("No value");
  }

  const loggedInUserId = contextValue.userId;

  const [member, setMember] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "RatingScreen">
    >();

  const handlePress = async () => {
    navigation.navigate("RatingScreen", { id: uId, eventId: eventId });
  };

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

  // Use useFocusEffect to fetch data when the component comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchMemberAndEventData();
    }, [])
  );

  if (!member || !event) {
    return <Text>Loading M...</Text>; // Loading state
  }

  return (
    <View style={styles.Container}>
      <View style={styles.ProfileContainer}>
        <Image
          source={
            member.profilePicture === undefined ||
            member.profilePicture === null
              ? defaultProfilePicture
              : { uri: member.profilePicture }
          }
          style={styles.ProfilePicture}
        />
        <Text style={styles.NameText}>{member.username}</Text>
      </View>
      {loggedInUserId !== uId &&
      event.members.includes(loggedInUserId) &&
      !member?.rated?.includes(loggedInUserId) ? (
        <TouchableOpacity style={styles.RateButton} onPress={handlePress}>
          <Text style={styles.RateText}>Rate</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    marginBottom: 15,
  },
  ProfileContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically in center
  },
  ProfilePicture: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 10,
  },
  NameText: {
    color: "white",
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 24,
  },
  RateButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#28B67E",
  },
  RateText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
});
