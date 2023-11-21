import { Timestamp } from 'firebase/firestore';
import EventCard from '../components/EventCard';
import { ListRenderItem } from 'react-native';
import { Event } from './api';

export const timestampToString = (timestamp: Timestamp, req: 'time' | 'date') => {
  const date = timestamp.toDate();

  if (req === 'date') {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long', // e.g., Thursday
      day: 'numeric', // e.g., 17
      month: 'long', // e.g., November
    });
    const formattedDate = dateFormatter.format(date);
    return formattedDate;

  } else {
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', // Hour (1-12)
      hour12: true, // Use 12-hour format
    });
    const formattedTime = timeFormatter.format(date);
    return formattedTime;
  }
};

export const generateSimpleToken = () => {
  const now = new Date().getTime(); // Current time
  const random = Math.random() * 1000000; // Random number
  return `${now}-${Math.floor(random)}`;
}

export const generateUserId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return timestamp + randomNum;
}

export const generateEventId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 100000);
  return timestamp + randomNum;
};