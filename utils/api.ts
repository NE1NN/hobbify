import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + 'data.json';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

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
  return events
};
