import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Center, HStack, IconButton, Pressable, Text, View } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logo from '../../../components/Logo/Logo';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';

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
      <Logo position="absolute" top="16"/>

      <Center w='5/6'>
        <View
          bgColor='light.50'
          rounded='2xl'
          m={2}
          w='full'
        >
          <Pressable onPress={() => navigation.navigate(PaymentsRoutes.NewTransfer as never)}>
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
          <Pressable onPress={() => navigation.navigate(PaymentsRoutes.NewCyclicalTransfer as never)}>
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
          <Pressable onPress={() => navigation.navigate(PaymentsRoutes.CyclicalTransfers as never)}>
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="server" size={72}/>}
              />
              <Text
                fontSize='md'
                color='dark.800'
              >
                Zapisane Przelewy
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
          <Pressable onPress={() => navigation.navigate(PaymentsRoutes.History as never)}>
            <HStack alignItems="center">
              <IconButton
                icon={<MaterialCommunityIcons name="history" size={72}/>}
              />

              <Text
                fontSize='md'
                color='dark.800'
              >
                Historia p??atno??ci
              </Text>
            </HStack>
          </Pressable>
        </View>

      </Center>
    </View>
  );
};

export default Payments;
