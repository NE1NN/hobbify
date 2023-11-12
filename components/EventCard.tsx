import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

type EventCardProps = {
  name: string,
  thumbnail: string,
  location: string
}

export default function EventCard({name, thumbnail, location}: EventCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{uri: thumbnail}} style={styles.image}></Image>
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" />
          <Text>{location}</Text>
        </View>
        <View>
          <Text>Thursday, 11 November</Text>
          <Text>at 4pm</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  detailsContainer: {
    justifyContent: 'center',
    gap: 20,
    marginLeft: 15
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
    gap: 5
  },
});
