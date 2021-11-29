import React from 'react';
import { overriddenTheme } from "../constants/overriddenTheme";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./UnauthorizedViews/Login/Login";
import AuthorizedViews from "./AuthorizedViews/AuthorizedViews";
import Sandbox from "./UnauthorizedViews/Sandbox/Sandbox";
import { NativeBaseProvider } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// TODO Add User context
const Views = () => {
  return (
    <NativeBaseProvider theme={overriddenTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={AuthorizedViews}/>
          <Stack.Screen name="Sandbox" component={Sandbox}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Views;
