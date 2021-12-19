import React from 'react';
import Home from "./Home/Home";
import Payments from "./Payments/Payments";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import Account from "./Account/Account";
import { NavigationContainer } from "@react-navigation/native";
import History from "./History/History";

const Tab = createBottomTabNavigator();

const navigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
  tabBarLabelPosition: 'below-icon',
  tabBarActiveTintColor: 'red',
  tabBarInactiveTintColor: 'black'
};

const homeScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <AiOutlineHome size={size + 5}/>,
  title: "Strona główna",
};

const paymentsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <FaRegMoneyBillAlt size={size + 5}/>,
  title: "Płatności",
};

const accountScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size }) => <BsPerson size={size + 5}/>,
  title: "Konto",
};

const AuthorizedViews = () => {
  return (
    <NavigationContainer>
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

        <Tab.Screen
          name='History'
          component={History}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthorizedViews;
