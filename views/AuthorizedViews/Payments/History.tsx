import React from 'react';
import Logo from "../../../components/Logo/Logo";
import {View} from "native-base";

const History = () => {
  return (
    <View
      width={"full"}
      h='full'
      backgroundColor='primary_dark.800'
      alignItems='center'
      color='dark.400'
      p={2}
    >
      <Logo position="relative" top="2"/>

    </View>
  );
};

export default History;