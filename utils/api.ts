import * as FileSystem from "expo-file-system";
const filePath = FileSystem.documentDirectory + "data.json";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Timestamp } from "firebase/firestore";
import { generateSimpleToken, generateUserId } from "./helpers";

export type User = {
  userId: number;
  name: string;
  profilePicture: string;
};

export type Event = {
  eventId: string;
  creatorId: number;
  thumbnail: string;
  name: string;
  nameLowered: string;
  description: string;
  location: string;
  time: Timestamp;
  isPublic: boolean;
  members: number[];
  likes: number[];
  membersLimit: number;
};

export type createEventDetails = {
  creatorId: number;
  thumbnail: string;
  name: string;
  desc: string;
  location: string;
  date: Date;
  time: Date;
  isPublic: boolean;
  membersLimit: number;
};

export const getEvents = async () => {
  const eventsCol = collection(db, "events");
  const eventsDocs = await getDocs(eventsCol);

  const events: Event[] = eventsDocs.docs.map(
    (doc) =>
      ({
        eventId: doc.id,
        ...doc.data(),
      } as Event)
  );
  return events;
};

export const searchEvent = async (searchValue: string) => {
  const eventsCol = collection(db, "events");
  const eventsQuery = query(
    eventsCol,
    where("nameLowered", ">=", searchValue.toLowerCase()),
    where("nameLowered", "<=", searchValue.toLowerCase() + "\uf8ff")
  );
  const eventDocs = await getDocs(eventsQuery);
  return eventDocs;
};

export const getEvent = async (eventId: string) => {
  const eventsCol = collection(db, "events");
  const eventRef = doc(eventsCol, eventId);
  const eventDoc = await getDoc(eventRef);
  return eventDoc;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userCol = collection(db, "users");

  const usernameQuery = query(userCol, where("username", "==", username));
  const querySnapshot = await getDocs(usernameQuery);

  if (!querySnapshot.empty) {
    // Username already exists
    throw new Error("Username already taken");
  }

  let user = {
    createdEvents: [],
    email,
    joinedEvents: [],
    username,
    password,
    userId: generateUserId(),
  };

  await addDoc(userCol, user);
  return {
    token: generateSimpleToken(),
    userId: user.userId,
  };
};

export const loginUser = async (username: string, password: string) => {
  const usersCol = collection(db, "users");
  const q = query(
    usersCol,
    where("username", "==", username),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);
  try {
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data(); // Retrieve the data of the user document

      const userId = userData.userId; // Access the 'userId' field

      return {
        token: generateSimpleToken(),
        userId: userId, // Use the 'userId' from the document data
      };
    } else {
      return null;
    }
  } catch (e) {
    console.log("meki", e);
  }
};

export const getUserDetail = async (userId: number) => {
  const usersCol = collection(db, "users");
  const q = query(usersCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data(); // Retrieve the data of the user document

    const username = userData.username;

    return username;
  } else {
    return null;
  }
};

export const createEvent = async (props: createEventDetails) => {
  const {
    creatorId,
    thumbnail,
    name,
    desc,
    location,
    date,
    time,
    isPublic,
    membersLimit,
  } = props;
  const eventsCol = collection(db, "events");

  // Extracting date parts
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  // Extracting time parts
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let milliseconds = time.getMilliseconds();

  // Creating a new Date object with combined date and time
  let combinedDateTime = new Date(
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  );

  const timestamp = Timestamp.fromDate(combinedDateTime);

  let event = {
    creatorId,
    location,
    members: [creatorId],
    name,
    description: desc,
    nameLowered: name.toLowerCase(),
    thumbnail,
    time: timestamp,
    isPublic,
    membersLimit,
    likes: [],
  };

  await addDoc(eventsCol, event);
  return {};
};
