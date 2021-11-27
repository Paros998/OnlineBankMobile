import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home/Home";

const Stack = createNativeStackNavigator();

const Authorized = () => {
  return (
      <Stack.Screen name="HomePage" component={Home}/>
  );
};

export default Authorized;