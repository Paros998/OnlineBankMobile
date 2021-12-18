import * as React from 'react';
import { initAxios } from "./utils/initAxios";
import Views from "./views/Views";
import CurrentUserProvider from "./contexts/CurrentUserProvider";
import { overriddenTheme } from "./constants/overriddenTheme";
import { NativeBaseProvider } from 'native-base';

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
