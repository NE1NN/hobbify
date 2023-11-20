import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventsScreen from '../screens/EventsScreen';

const Tab = createMaterialTopTabNavigator();

export function EventsTopBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={EventsScreen} />
      <Tab.Screen name="Settings" component={EventsScreen} />
    </Tab.Navigator>
  );
}