import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from './src/screens/Home';
import Boot from './src/screens/Boot';
import Jenius from './src/screens/Jenius';
import Flip from './src/screens/Flip';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Boot" component={Boot} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Jenius" component={Jenius} />
        <Stack.Screen name="Flip" component={Flip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
