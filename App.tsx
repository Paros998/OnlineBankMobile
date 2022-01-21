import * as React from 'react';
import { NativeBaseProvider } from 'native-base';
import { initAxios } from "./utils/initAxios";
import { enableScreens } from 'react-native-screens';
import Views from "./views/Views";
import CurrentUserProvider from "./contexts/CurrentUserProvider";
import { overriddenTheme } from "./constants/overriddenTheme";

enableScreens(false);
initAxios().catch();

export default function App() {
  return (
    <NativeBaseProvider theme={overriddenTheme}>
      <CurrentUserProvider>
        <Views/>
      </CurrentUserProvider>
    </NativeBaseProvider>
  );
}
