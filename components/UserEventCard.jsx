import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import userIcon from "../assets/icon.png";

export default function UserEventCard({ uId, eventId }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={userIcon} style={styles.userImage} />
      <View style={styles.userDetailsContainer}>
        <Text style={styles.userName}>Name</Text>
        <Text style={styles.userDescription}>From xyz</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: 'center',
  },
  userImage: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    marginRight: 27
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
