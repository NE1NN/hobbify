import { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { User, getUserData, getUserDetail } from "../../utils/api";
import React from "react";
import defaultProfilePicture from "../../assets/icon.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/core";
import AuthContext from "../../AuthContext";

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

  console.log(uId, loggedInUserId, eventId)
  console.log('eventId member 1', eventId)


  const [member, setMember] = useState<User | null>(null);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "RatingScreen">
    >();

  const handlePress = async () => {
    console.log('eventId member', eventId)
    navigation.navigate("RatingScreen", { id: uId, eventId: eventId });
  };

  useEffect(() => {
    const retrieveMember = async () => {
      console.log(uId);
      try {
        setMember(await getUserData(uId));
        console.log("foo", await getUserData(uId));
      } catch (error) {
        console.error("error:", error);
      }
    };
    retrieveMember();
  }, []);

  useEffect(() => {
    console.log(member);
  }, [Member]);

  if (!member) {
    console.log('member', member);
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
              : member.profilePicture
          }
          style={styles.ProfilePicture}
        />
        <Text style={styles.NameText}>{member.username}</Text>
      </View>
      {loggedInUserId !== uId ? (
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
    marginBottom: 15
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
