import React, { FC } from 'react';
import { Button, Center, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';

const Sandbox: FC = () => {
  const navigation = useNavigation();

  return (
    <Center h='full'>
      <Heading color='pink.500'>Testowanie :)</Heading>

      <Button
        mt={5}
        colorScheme='pink'
        onPress={() => navigation.goBack()}
      >
        Wróc do strony logowania
      </Button>
    </Center>
  );
};

export default Sandbox;
