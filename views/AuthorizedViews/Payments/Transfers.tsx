import React, {FC} from 'react';
import {Center, View} from 'native-base';
import Logo from "../../../components/Logo/Logo";

interface TransferFormProps{
  showAdditionalInputs:boolean
}

const Transfers:FC<TransferFormProps> = ({showAdditionalInputs}) => {
  return (
    <View
      height={"full"}
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Logo/>
      <Center w={5/6}>

      </Center>
    </View>
  );
};

export default Transfers;