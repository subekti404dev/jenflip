import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from './src/screens/home/Home';
import Boot from './src/screens/boot/Boot';
import LoginJenius from './src/screens/login/LoginJenius';
import LoginFlip from './src/screens/login/LoginFlip';
import AppRouteKeys from './AppRouteKeys';
import TransferViaJenius from './src/screens/transfer/jenius/TransferViaJenius';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import AppStore from './src/stores/AppStore';

const store = createStore(AppStore);

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={AppRouteKeys.Boot} component={Boot} />
          <Stack.Screen name={AppRouteKeys.Home} component={Home} />
          <Stack.Screen
            name={AppRouteKeys.Login.Jenius}
            component={LoginJenius}
          />
          <Stack.Screen name={AppRouteKeys.Login.Flip} component={LoginFlip} />
          <Stack.Screen
            name={AppRouteKeys.Transfer.Jenius}
            component={TransferViaJenius}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
