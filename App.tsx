import React from 'react';

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Home from './components/Home';
import LocationInput from './components/LocationInput';

export type RootStackParamList = {
  Home: undefined;
  Details: {productId: string}
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen
        name='LocationInput'
        component={LocationInput}
        options={{
          headerShown:false
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;