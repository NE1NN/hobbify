import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from '@rneui/base';
import { createEvent } from '../utils/api';
import AuthContext from '../AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEvent'>;

const CreateEvent = ({ navigation }: Props) => {
  const [thumbnail, setThumbnail] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [members, setMembers] = useState('');

  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [isPublic, setIsPublic] = useState(false)

  const contextValue = useContext(AuthContext);
  // const { userId } = contextValue
  const creatorId = 1;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setThumbnail(result.assets[0].uri);
    }
  };

  const onDateChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const formatTime = (time: Date) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleCreateEvent = async () => {
    await createEvent({
      creatorId,
      thumbnail,
      name,
      desc,
      location,
      members,
      date,
      time,
      isPublic,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Create Event</Text>
      <View style={styles.imageContainer}>
        {thumbnail !== "" ? (
          <Image source={{ uri: thumbnail }} style={styles.image} />
        ) : undefined}
      </View>
      <TouchableOpacity style={styles.editPictureButton} onPress={pickImage}>
        <Text style={styles.editPictureText}>Edit Picture</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={desc}
          onChangeText={setDesc}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Date</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </TouchableOpacity>
      </View>

      {/* Show date picker as a modal popup */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Time</Text>
        <TouchableOpacity
          style={styles.timeInput}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Members</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={members}
          onChangeText={setMembers}
        />
      </View>
      <View style={styles.segmentedControlContainer}>
        <TouchableOpacity
          style={[
            styles.segment,
            isPublic === false ? styles.segmentSelected : null,
          ]}
          onPress={() => setIsPublic(false)}
        >
          <Text
            style={[
              styles.segmentText,
              isPublic === false ? styles.segmentTextSelected : null,
            ]}
          >
            Private
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segment, isPublic ? styles.segmentSelected : null]}
          onPress={() => setIsPublic(true)}
        >
          <Text
            style={[
              styles.segmentText,
              isPublic ? styles.segmentTextSelected : null,
            ]}
          >
            Public
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submit} onPress={handleCreateEvent}>
        <Text style={{ fontSize: 15, color: '#fff' }}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputTitle: {
    width: 90,
    fontWeight: "bold",
    fontSize: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#FAF8F8",
  },
  multilineInput: {
    paddingTop: 8,
    height: 80,
  },
  editPictureButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  editPictureText: {
    color: "#28B67E",
    fontWeight: "500",
  },
  imageContainer: {
    marginTop: 10,
    borderWidth: 1,
    width: 150,
    height: 200,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  dateInput: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#FAF8F8",
    justifyContent: "center",
  },
  dateText: {
    color: "black",
  },
  timeInput: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#FAF8F8",
    justifyContent: "center",
  },
  timeText: {
    color: "black",
  },

  segmentedControlContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10
  },
  segment: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  segmentSelected: {
    backgroundColor: "#28B67E",
  },
  segmentText: {
    textAlign: "center",
    color: "#000",
  },
  segmentTextSelected: {
    color: "#fff",
  },
  submit: {
    width: '40%',
    backgroundColor: '#28B67E',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  }
});

export default CreateEvent;
