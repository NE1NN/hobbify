import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { User, getUserDetail } from "../utils/api";
import React from "react";

export function Member({ uId }: { uId: number }) {
  const [member, setMember] = useState<User | null>(null)

  useEffect(() => {
    const retrieveMember = async () => {
      console.log(uId)
      try {
        const snapshot = await getUserDetail(uId);
        if (snapshot.exists()) {
          const memberData = snapshot.data() as User;
          setMember(memberData);
          console.log(memberData);
        } else {
          console.log("no member");
        }
      } catch (error) {
        console.error("error:", error);
      }
    };
    retrieveMember();
  })

  if (!member) {
    return <Text>Loading...</Text>; // Loading state
  }

  return (
    <View>
      <View>
        <Text>Photo</Text>
        <Text>{member.name}</Text>
      </View>
      <TouchableOpacity>
        <Text>Rate</Text>
      </TouchableOpacity>
    </View>
  );
}
