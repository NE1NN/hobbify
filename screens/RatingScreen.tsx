import React, { useContext, useState } from "react";
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
import UserEventCard from "../components/UserEventCard";
import ToggleButton from "../components/RatingButton";
import userIcon from "../assets/icon.png";
import { submitRating } from "../utils/api";
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

  console.log("uId", uId);
  console.log("eventId", eventId);
  console.log("raterId", raterId);

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

  return (
    // <SafeAreaView style={styles.SafeAreaView}>
    <ScrollView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <Image source={userIcon} style={styles.userImage} />
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userName}>Name</Text>
          <Text style={styles.userDescription}>From xyz</Text>
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
  buttonText: {},
  heading: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 30,
  },
});

export default RatingScreen;
