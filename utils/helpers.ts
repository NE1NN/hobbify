import { Timestamp } from 'firebase/firestore';

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
