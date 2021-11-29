import React, { FC } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Card, Center, Heading, Text, View } from "native-base";
import Logo from "../../../components/Logo/Logo";
import RecentTransactions from "./RecentTransactions";

const Home: FC = () => {
  const navigation = useNavigation();
  return (
    <View backgroundColor='dark.800' h='full'>
      <Box
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      >
        <Box
          backgroundColor='primary.500'
          width='full'
          height='200'
          position='relative'
          alignItems='center'
          shadow={5}
        >
          <Box position='fixed' top='3' right='3'>
            <MaterialCommunityIcons
              name='power-standby'
              size={40}
              color='white'
              onPress={() => navigation.goBack()}
            />
          </Box>

          <Logo position="fixed" top="10"/>
        </Box>

        <Card
          rounded='lg'
          backgroundColor='white'
          position='absolute'
          top='2/3'
          shadow={9}
        >
          <Heading color='black' fontSize={24}>
            Konto Future Bank
          </Heading>

          <Text color='black' mt={8} fontSize={14}>
            Stan konta:
          </Text>

          <Text color='black' bold fontSize={18}>
            3213,90 PLN
          </Text>
        </Card>
      </Box>

      <RecentTransactions/>

      <Center>
        <Button w='1/2'>
          Zobacz więcej w historii
        </Button>
      </Center>
    </View>
  );
};

export default Home;
