import React from 'react';
import {Center, Text, IconButton, View, HStack, Button} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Logo from "../../../components/Logo/Logo";
import { useNavigation } from "@react-navigation/native";
import Transfers from "./Transfers";


const Payments = () => {
  const navigation = useNavigation();

  return (
    <View
      height={"full"}
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Logo position="fixed" top="16"/>

      <Center w='5/6'>
        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <HStack alignItems="center">
            <IconButton
              icon={<MaterialCommunityIcons name="bank-transfer-out" size={72}/>}
              onPress={() => navigation.navigate('Transfers' as never,{
                type: 'normal'
              } as never)}
            />

            <Text
              fontSize='md'
              color='dark.800'
            >
              Szybki Przelew
            </Text>
          </HStack>
        </View>

        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="transfer" size={72}/>}
                onPress={() => navigation.navigate('Transfers' as never,{
                  type: 'cyclical'
                } as never)}
              />
              <Text
                fontSize='md'
                color='dark.800'
              >
                Przelew Cykliczny
              </Text>
          </HStack>
        </View>
      </Center>
    </View>
  );
};

export default Payments;
