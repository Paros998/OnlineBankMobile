import * as React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from "./views/UnauthorizedViews/Login/Login";
import Authorized from "./views/AuthorizedViews/Authorized";
import {initAxios} from "./utils/initAxios";
import Payments from "./views/AuthorizedViews/Payments/Payments";

const Stack = createNativeStackNavigator();
initAxios();

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#ffe3e3',
        100: '#feb6b6',
        200: '#f88888',
        300: '#f35858',
        400: '#ee2a2a',
        500: '#d51111',
        600: '#a70a0c',
        700: '#770507',
        800: '#4a0203',
        900: '#200000',
      },
      primary_light: {
        50: '#ffe6e6',
        100: '#f9b9b9',
        200: '#f28b8b',
        300: '#ed5f5e',
        400: '#e93330',
        500: '#cf1d17',
        600: '#a11511',
        700: '#740e0d',
        800: '#460606',
        900: '#1b0000',
      },
      primary_dark: {
        50: '#ffe2e2',
        100: '#ffb2b2',
        200: '#ff8080',
        300: '#fe4e4e',
        400: '#fe1f1c',
        500: '#e50a03',
        600: '#b20301',
        700: '#800000',
        800: '#4e0000',
        900: '#1f0000',
      },
      secondary: {
        50: '#fceff2',
        100: '#ddd7d9',
        200: '#c1bfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#413f40',
        800: '#292526',
        900: '#16090d',
      },
      secondary_light: {
        50: '#f8f0f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#120b0d',
      },
      secondary_dark: {
        50: '#fbf0f2',
        100: '#dcd8d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#282626',
        900: '#150a0d',
      },
      dark: {
        50: '#f2f2f8',
        100: '#d7d9da',
        200: '#bfc0c0',
        300: '#a6a6a6',
        400: '#8d8d8d',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#252728',
        900: '#040f0f',
      },
      light: {
        50: '#f2f2f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#0d0d0d',
      },

    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });

  return (
    <>
      <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Authorized}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </>
  );
}


