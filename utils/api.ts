import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + 'data.json';
import { collection, getDocs, query, where, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import { generateSimpleToken, generateUserId } from './helpers';

type User = {
  userId: number;
  name: string;
};

export type Event = {
  eventId: string;
  thumbnail: string;
  name: string;
  location: string;
  creatorId: number;
  time: Timestamp;
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
  const eventsCol = collection(db, 'events')
  const eventRef = doc(eventsCol, eventId)
  const eventDoc = await getDoc(eventRef)
  return eventDoc
}

export const registerUser = async (username: string, email: string, password: string) => {
  const userCol = collection(db, 'users')

  let user = {
    createdEvents: [],
    email,
    joinedEvents: [],
    username,
    password,
    userId: generateUserId()
  }

  await addDoc(userCol, user)
  return generateSimpleToken()
}

export const loginUser = async (username: string, password: string) => {
  const usersCol = collection(db, 'users')
  const q = query(
    usersCol, 
    where("username", "==", username),
    where("password", "==", password )
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  if (!querySnapshot.empty) {
    return generateSimpleToken(); 
  } else {
    return null;
  }
}