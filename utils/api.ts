import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + 'data.json';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Timestamp } from "firebase/firestore";
import { generateSimpleToken, generateUserId } from "./helpers";
import { async } from '@firebase/util';

export type User = {
  userId: number;
  username: string;
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
  const eventsCol = collection(db, 'events');
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

export const getUpcomingEvents = async() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0);

  const todayTimestamp = Timestamp.fromDate(today)

  const eventsCol = collection(db, 'events');
  const eventsQuery = query(eventsCol, where('time', '>', todayTimestamp))
  const eventsDocs = await getDocs(eventsQuery);

  const events: Event[] = eventsDocs.docs.map(
    (doc) =>
      ({
        eventId: doc.id,
        ...doc.data(),
      } as Event)
  );
  return events;
}
export const getMyEvents = async(userId: number) => {
  const eventsCol = collection(db, 'events');
  const eventsQuery = query(eventsCol, where('creatorId', '==', userId))
  const eventsDocs = await getDocs(eventsQuery);

  const events: Event[] = eventsDocs.docs.map(
    (doc) =>
      ({
        eventId: doc.id,
        ...doc.data(),
      } as Event)
  );
  return events;
}

export const searchEvent = async (searchValue: string) => {
  const eventsCol = collection(db, 'events');
  const eventsQuery = query(
    eventsCol,
    where('nameLowered', '>=', searchValue.toLowerCase()),
    where('nameLowered', '<=', searchValue.toLowerCase() + '\uf8ff')
  );
  const eventDocs = await getDocs(eventsQuery);
  return eventDocs;
};

export const getEvent = async (eventId: string) => {
  const eventsCol = collection(db, 'events');
  const eventRef = doc(eventsCol, eventId);
  const eventDoc = await getDoc(eventRef);
  return eventDoc;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userCol = collection(db, 'users');

  const usernameQuery = query(userCol, where('username', '==', username));
  const querySnapshot = await getDocs(usernameQuery);

  if (!querySnapshot.empty) {
    // Username already exists
    throw new Error('Username already taken');
  }

  let user = {
    createdEvents: [],
    email,
    joinedEvents: [],
    username,
    password,
    userId: generateUserId(),
    profilePicture: null,
  };

  await addDoc(userCol, user);
  return {
    token: generateSimpleToken(),
    userId: user.userId,
  };
};

export const loginUser = async (username: string, password: string) => {
  const usersCol = collection(db, 'users');
  const q = query(
    usersCol,
    where('username', '==', username),
    where('password', '==', password)
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
    console.log('meki', e);
  }
};

export const getUserDetail = async (userId: number) => {
  const usersCol = collection(db, 'users');
  const q = query(usersCol, where('userId', '==', userId));
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

export const getUserData = async (userId: number): Promise<User | null> => {
  const usersCol = collection(db, "users");
  const userQuery = query(usersCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Assuming the user data in Firestore matches the User type structure
    const user: User = {
      userId: userData.userId,
      username: userData.username,
      profilePicture: userData.profilePicture,
    };

    return user;
  } else {
    // Return null if the user is not found
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
  const eventsCol = collection(db, 'events');

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

export const likeEvent = async (eventId: string, userId: number) => {
  const eventRef = doc(db, "events", eventId);

  try {
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();

      // Check if the user has already liked the event
      if (!eventData.likes.includes(userId)) {
        // Update the likes array to include the new userId
        await updateDoc(eventRef, {
          likes: arrayUnion(userId)
        });
      } else {
        await updateDoc(eventRef, {
          likes: arrayRemove(userId)
        });
        console.log("Like removed");
      }
    } else {
      console.log("Event not found");
    }
  } catch (error) {
    console.error("Error liking event:", error);
  }
};

export const updateProfPic = async (newProfPic: string, userId: number) => {
  const usersCol = collection(db, 'users');
  const userQuery = query(usersCol, where('userId', '==', userId));

  try {
    const querySnapshot = await getDocs(userQuery);
    if (querySnapshot.empty) {
      console.log('No user found with the given userId');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userDocRef = userDoc.ref;

    await updateDoc(userDocRef, { profPic: newProfPic });
    console.log('Profile picture updated successfully');
  } catch (err) {
    console.error('Failed updating profile picture', err);
  }
};
