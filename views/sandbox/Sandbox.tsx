import React, { FC } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BsPerson } from 'react-icons/bs'
import { Box, Card, Heading, Text, View, VStack } from "native-base";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const getCashColor = (amount: number) => amount > 0 ? 'green.500' : 'black';

const RecentTransactions: FC = () => {
  const payments = [
    {
      receiver: 'Sklep Spożywczy Basia',
      category: 'Wydatki bieżące',
      cash: -12.59,
    },
    {
      receiver: 'Warsztat Auto-Części',
      category: 'Wydatki bieżące',
      cash: -990,
    },
    {
      receiver: 'Wynagrodzenie',
      category: 'Zarobki',
      cash: 3330,
    },
  ];

  return (
    <VStack p={10} mt='40'>
      <Heading textAlign='center' color='black'>
        Ostatnie transakcje
      </Heading>
      {
        payments.map(({ receiver, category, cash }) => (
          <Card
            rounded='lg'
            mt='5'
            shadow={2}
            backgroundColor='white'
          >
            <Box
              justifyContent='space-between'
              flexDirection='row'
            >
              <Box>
                <Heading color='black' fontSize={15}>
                  {receiver}
                </Heading>

                <Text color='gray.500'>
                  {category}
                </Text>
              </Box>

              <Heading color={getCashColor(cash)} fontSize={15}>
                {cash.toFixed(2)} PLN
              </Heading>
            </Box>
          </Card>
        ))
      }
    </VStack>
  );
};

const Home = () => (
  <View>
    <Box
      justifyContent='center'
      alignItems='center'
      flexDirection='row'
    >
      <Box
        backgroundColor='primary.500'
        width='full'
        height='100'
        position='relative'
        shadow={3}
      />

      <Card
        rounded='lg'
        backgroundColor='white'
        position='absolute'
        top='1/2'
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
  </View>
);

const Payments = () => (
  <View>
    <Heading color='black'>Witaj na stronie płatności</Heading>
  </View>
);

const Account = () => (
  <View>
    <Heading color='black'>Witaj na stronie konta</Heading>
  </View>
);

const navigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: { fontSize: 14 },
  tabBarLabelPosition: 'below-icon',
  tabBarActiveTintColor: 'red'
};

const homeScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <AiOutlineHome size={size + 5}/>,
};

const paymentsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <FaRegMoneyBillAlt size={size + 5}/>,
};

const accountScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <BsPerson size={size + 5}/>,
};

const Sandbox: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={navigatorOptions}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={homeScreenOptions}
      />

      <Tab.Screen
        name='Payments'
        component={Payments}
        options={paymentsScreenOptions}
      />

      <Tab.Screen
        name='Account'
        component={Account}
        options={accountScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default Sandbox;
