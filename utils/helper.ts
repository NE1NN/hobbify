import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + 'data.json';

type User = {
  userId: number;
  name: string;
};

type Event = {
  eventId: number;
  thumbnail: string;
  name: string;
  location: string;
  creatorId: number;
};

type Data = {
  users: User[];
  events: Event[];
};

const readJsonFile = async (filePath: string) => {
  try {
    const content = await FileSystem.readAsStringAsync(filePath);
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};

export const getUsers = async () => {
  try {
    const data = await readJsonFile(filePath);
    console.log(data)
    return data?.users;
  } catch (error) {
    console.error('Error parsing:', error);
    return null;
  }
};
