import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Map} from './screens/Map';
import {About} from './screens/About';

export type NavigationStackProps = {
  Map: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<NavigationStackProps>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
