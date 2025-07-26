import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import TextScreen from './screens/TextScreen';
import FormScreen from './screens/FormScreen';
import UploadScreen from './screens/UploadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'AI_m_yours' }}
        />
        <Stack.Screen 
          name="Text" 
          component={TextScreen} 
          options={{ title: 'Pick-up line of day' }}
        />
        <Stack.Screen 
          name="Form" 
          component={FormScreen} 
          options={{ title: 'Cringe-ometre' }}
        />
        <Stack.Screen 
          name="Upload" 
          component={UploadScreen} 
          options={{ title: 'Outfit of the Date' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}