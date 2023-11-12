import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + 'data.json';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
};

type Data = {
  users: User[];
  events: Event[];
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
  console.log(events)

  return events
};
