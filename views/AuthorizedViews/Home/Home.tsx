import React, { FC } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Card, Center, Heading, Text, View } from "native-base";
import Logo from "../../../components/Logo/Logo";
import RecentTransactions from "./RecentTransactions";
import { useCurrentUser } from "../../../contexts/CurrentUserProvider";

const Home: FC = () => {
  const navigation = useNavigation();
  const { currentUser, handleLogout } = useCurrentUser();

  return (
    <View backgroundColor='dark.800' h='full'>
      <Box
        justifyContent='center'
        alignItems='center'
        flexDirection='row'
      >
        <Box
          backgroundColor='primary_dark.600'
          width='full'
          height='230'
          position='relative'
          alignItems='center'
          shadow={5}
        >
          <Box top='20' left={'40'}>
            <MaterialCommunityIcons
              name='power-standby'
              size={40}
              color='white'
              onPress={() => {
                handleLogout().then(() => navigation.navigate('Home' as never));
              }}
            />
          </Box>

          <Logo top="10"/>
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
            {currentUser?.balance} PLN
          </Text>
        </Card>
      </Box>

      <RecentTransactions/>

      <Center>
        <Button
          w='1/2'
          onPress={()=>{
            navigation.navigate('PaymentsHome' ,{screen: "History"});
          }}
        >
          Zobacz więcej w historii
        </Button>
      </Center>
    </View>
  );
};

export default Home;
