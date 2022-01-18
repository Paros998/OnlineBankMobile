import React from 'react';
import Login from './Login/Login';
import Help from './Help/Help';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UnauthorizedViews = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Help" component={Help}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnauthorizedViews;
