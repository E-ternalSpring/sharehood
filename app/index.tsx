import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/app/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
