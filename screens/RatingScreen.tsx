import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleButton from "../components/RatingButton";
import userIcon from "../assets/icon.png";
import { Event, User, getEvent, getUserData, submitRating } from "../utils/api";
import AuthContext from "../AuthContext";
import { useNavigation } from "@react-navigation/core";

const adjectives = [
  "Kind",
  "Happy",
  "Brave",
  "Smart",
  "Quiet",
  "Serious",
  "Shy",
  "Calm",
  "Lazy",
  "Rude",
  "Mean",
  "Grumpy",
];

const RatingScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();

  const { id, eventId } = route.params;
  const uId = id;
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("No value");
  }

  const raterId = contextValue.userId;

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  // Function to handle button press
  const handleButtonPress = (label: string) => {
    if (selectedButtons.includes(label)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== label));
    } else {
      setSelectedButtons([...selectedButtons, label]);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitRating(uId, raterId, selectedButtons);
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        String(error), // Convert error to a string
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ]
      );
    }
  };

  const [member, setMember] = useState<User | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const retrieveMember = async () => {
      try {
        setMember(await getUserData(uId));
        console.log("foo", await getUserData(uId));
      } catch (error) {
        console.error("error:", error);
      }
    };
    retrieveMember();
    const retrieveEvent = async () => {
      try {
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
    retrieveEvent();
  }, []);

  if (!member) {
    return <Text>Loading..</Text>;
  }

  return (
    // <SafeAreaView style={styles.SafeAreaView}>
    <ScrollView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Image
          source={
            member.profilePicture === undefined ||
            member.profilePicture === null
              ? userIcon
              : { uri: member.profilePicture }
          }
          style={styles.userImage}
        />
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userName}>{member?.username}</Text>
          <Text style={styles.userDescription}>From {event?.name}</Text>
        </View>
      </View>
      <Text>{selectedButtons.toString()}</Text>
      <Text style={styles.heading}>What do you think of this user?</Text>
      <View style={styles.ButtonContainer}>
        {adjectives.map((label) => (
          <ToggleButton
            key={label}
            label={label}
            isSelected={selectedButtons.includes(label)}
            onPress={handleButtonPress}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          selectedButtons.length > 0
            ? styles.buttonActive
            : styles.buttonInactive,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 20,
    marginHorizontal: 25,
    height: "100%",
  },
  ButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // Adjust the distribution of buttons
  },
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
    fontSize: 30,
  },
  userDescription: {
    fontSize: 20,
  },
  userDetailsContainer: {
    flexDirection: "column",
  },
  confirmButton: {
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
  },
  buttonActive: {
    backgroundColor: "#28B67E",
  },
  buttonInactive: {
    backgroundColor: "#1D4C4F",
  },
  buttonText: {
    color: 'white'
  },
  heading: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 30,
  },
});

export default RatingScreen;
