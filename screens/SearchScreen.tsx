import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@rneui/themed';
import { searchEvent } from '../utils/api';
import EventCard from '../components/EventCard';
import { Event } from '../utils/api';

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (newText: string) => {
    setSearchValue(newText);
    setIsLoading(true);
    const searchedEvents = await searchEvent(newText);
    setEvents(
      searchedEvents.docs.map(
        (doc) => ({ eventId: doc.id, ...doc.data() } as Event)
      )
    );
    setIsLoading(false);
  };

  const renderEvents: ListRenderItem<Event> = ({ item }) => (
    <EventCard
      name={item.name}
      thumbnail={item.thumbnail}
      location={item.location}
      time={item.time}
      eventId={item.eventId}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        placeholder="Search for an event"
        platform="ios"
        value={searchValue}
        onChangeText={(newText) => handleInputChange(newText)}
      ></SearchBar>
      <View style={styles.eventsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEvents}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  eventsContainer: { marginLeft: 10, flex: 1 },
  loadingContainer: {justifyContent: 'center', alignItems: 'center', flex: 1}
});
