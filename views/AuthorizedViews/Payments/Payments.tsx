import React from 'react';
import {Center, Text, IconButton, View, HStack, Pressable} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons"

import Logo from "../../../components/Logo/Logo";
import {useNavigation} from "@react-navigation/native";
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
          <Pressable
            onPress={() => navigation.navigate('Transfers' as never, {
              type: 'cyclical'
            } as never)}
          >
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="qrcode-scan" size={72}/>}
              />

              <Text
                fontSize='md'
                color='dark.800'
              >
                Zapłać skanując QR
              </Text>
            </HStack>
          </Pressable>
        </View>

        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <Pressable
            onPress={() => navigation.navigate('Transfers' as never, {
              type: 'cyclical'
            } as never)}
          >
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="bank-transfer-out" size={72}/>}
              />

              <Text
                fontSize='md'
                color='dark.800'
              >
                Szybki Przelew
              </Text>
            </HStack>
          </Pressable>
        </View>

        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <Pressable
            onPress={() => navigation.navigate('Transfers' as never, {
              type: 'cyclical'
            } as never)}
          >
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="transfer" size={72}/>}
              />
              <Text
                fontSize='md'
                color='dark.800'
              >
                Przelew Cykliczny
              </Text>
            </HStack>
          </Pressable>
        </View>

        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <Pressable
            onPress={() => navigation.navigate('History' as never, {
              type: 'cyclical'
            } as never)}
          >
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="history" size={72}/>}
              />

              <Text
                fontSize='md'
                color='dark.800'
              >
                Historia płatności
              </Text>
            </HStack>
          </Pressable>
        </View>

      </Center>
    </View>
  );
};

export default Payments;
