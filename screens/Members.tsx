import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function Members({ route }: { route: any }) {
  const id = route.params.id;

  const [event, setEvent] = useState<Event | null>(null);

  const Member = (uId: string) => {
    return (
      <View>
        <View>
          <Text>Image</Text>
          <Text>UserName</Text>
        </View>
        <TouchableOpacity>
          <Text>Rate</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return;
}
