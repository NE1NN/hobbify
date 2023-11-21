import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Timestamp } from 'firebase/firestore';
import { timestampToString } from '../utils/helpers';
import { getEvent } from '../utils/api';

type EventCardProps = {
  name: string;
  thumbnail: string;
  location: string;
  time: Timestamp;
  eventId: string;
};

export default function EventCard({
  name,
  thumbnail,
  location,
  time,
  eventId,
}: EventCardProps) {
  const handlePress = async () => {
    const event = await getEvent(eventId);
    console.log(event);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: thumbnail }} style={styles.image}></Image>
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" />
          <Text>{location}</Text>
        </View>
        <View>
          <Text>{even}</Text>
          <Text>at {timestampToString(time, 'time')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  detailsContainer: {
    justifyContent: 'center',
    gap: 20,
    marginLeft: 15,
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 200,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
