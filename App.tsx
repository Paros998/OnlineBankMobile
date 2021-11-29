import * as React from 'react';
import { initAxios } from "./utils/initAxios";
import Views from "./views/Views";

initAxios();

export default function App() {
  return (
    <Views />
  );
}
