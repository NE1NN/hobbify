import { Button, Image, Text, View } from "react-native";
import React from "react";

export function EventDetails() {
  return (
    <View>
      <Text>Title</Text>
      <Image style={} source={}></Image>
      <View>
        <Text>About This Event</Text>
        <Text>Description</Text>
        <Button>Read More</Button>
      </View>
      <View>
        <Text>Icon</Text>
        <Text>Date</Text>
        <Text>Time</Text>
      </View>
      <View>
        <Text>Icon</Text>
        <Text>Location</Text>
      </View>
      <View>
        <Text>Members</Text>
        <Text>2/20</Text>
        <Text>Icons</Text>
        <Text>and More</Text>
      </View>
      <View>
        <Button>Like</Button>
        <Button>Join</Button>
      </View>
    </View>
  );
}
