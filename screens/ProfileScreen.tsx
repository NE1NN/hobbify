import { StyleSheet } from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Button,
  Image,
} from "react-native";
import { useContext, useState } from "react";
import dp from "../assets/Profile/dp.jpg";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import ellipse from "../assets/Profile/ellipseGreen.png";
import { ScrollView } from "react-native";
import { updateProfPic } from "../utils/api";
import AuthContext from "../AuthContext";

export default function ProfileScreen() {
  const [img, setImg] = useState(""); // img needs to be saved somewhere
  const [events, setEvents] = useState(157);
  const [missedEvents, setMissedEvents] = useState(12);
  const hobbies = [
    "Badmington🏸",
    "Drinking🍺",
    "Maths🧮",
    "Coding💻",
    "Hiking🌄",
  ];

  const personalityRatings = [
    ["Kind", 67],
    ["Introverted", 51],
    ["Shy-Guy", 88],
    ["Brainy🧠", 47],
    ["Chill❄", 22],
    ["Qwerky", 15],
    ["Talented", 24],
    ["Funny🤣", 30],
    ["Singer🎤", 1],
  ];

  const authContextValue = useContext(AuthContext)

  if (!authContextValue) {
    throw new Error('Auth context value empty')
  }

  const {userId} = authContextValue

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 16],
      cameraType: ImagePicker.CameraType.back,
    });
    if (!result.canceled) {
      const newProfPic = result.assets[0].uri
      setImg(newProfPic);
      await updateProfPic(newProfPic, userId)
    }
  };

  const Pill = ({ text }) => {
    return (
      <View style={{ paddingBottom: 10, paddingRight: 7 }}>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: "#28B67E",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{text}</Text>
        </View>
      </View>
    );
  };

  const PillAndCount = ({ text, count }) => {
    return (
      <View style={{ paddingBottom: 10, paddingRight: 10 }}>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: "#28B67E",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>{text}</Text>
        </View>
        <View
          style={{
            top: -2,
            height: 20,
            width: 20,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "red",
            position: "absolute",
            alignSelf: "flex-end",
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center", color: "white", fontSize: 10 }}>
            {count}
          </Text>
        </View>
      </View>
    );
  };

  const DisplayPic = ({ dp, uri }) => {
    return (
      <View>
        <TouchableOpacity onPress={pickImage}>
          <Image source={uri ? { uri: uri } : dp} style={styles.displayPic} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={ellipse} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.spacer} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.h1}>Profile</Text>
        </View>

        {/* Profile container */}
        <View style={styles.profileCont}>
          <DisplayPic dp={dp} uri={img} />
          <Text style={styles.h2}>John Doe</Text>
          <Text style={styles.h3}>
            <Ionicons name="location" size={24} color="black" /> Waterloo
          </Text>
          <Text style={styles.h3}>
            Attended events:{" "}
            <Text style={{ fontWeight: "bold", color: "green" }}>{events}</Text>
          </Text>
          <Text style={styles.h3}>
            Missed events:{" "}
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {missedEvents}
            </Text>
          </Text>
        </View>

        <View style={styles.spacer2} />
        <View style={styles.spacer3} />

        {/* Hobbies & Interests */}
        <View style={styles.hobbiesCont}>
          <Text style={[styles.h3, { fontWeight: "bold" }]}>
            Hobbies & Interests
          </Text>
          <View style={styles.spacer3} />
          <View style={styles.itemsCont}>
            {hobbies.map((item, index) => (
              <Pill key={index} text={item} />
            ))}
          </View>
        </View>

        <View style={styles.spacer3} />

        {/* Personality Ratings */}
        <View style={styles.personalityCont}>
          <Text style={[styles.h3, { fontWeight: "bold", color: "white" }]}>
            Personality Ratings
          </Text>
          <View style={styles.spacer3} />
          <View style={styles.itemsCont}>
            {personalityRatings.map(([text, count], index) => (
              <PillAndCount key={index} text={text} count={count} />
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  spacer: { height: 70, width: "100%" },
  spacer2: { height: 20, width: "100%" },
  spacer3: { height: 10, width: "100%" },
  header: {},
  h1: { fontSize: 30, fontWeight: "bold" },
  h2: { fontSize: 25, fontWeight: "bold" },
  h3: { fontSize: 20 },
  profileCont: {
    top: 10,
    justifyContent: "center",
    // borderWidth: 3,
    width: "100%",
    alignItems: "center",
  },
  displayPic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  hobbiesCont: {
    alignItems: "flex-start",
    // borderWidth: 3,
    width: "98%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ECE9E9",
    borderRadius: 10,
  },
  itemsCont: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  personalityCont: {
    alignItems: "flex-start",
    // borderWidth: 3,
    backgroundColor: "#1C4C4E",
    borderRadius: 10,
    width: "98%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
