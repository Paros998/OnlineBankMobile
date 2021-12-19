import React from 'react';
import Home from "./Home/Home";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import Account from "./Account/Account";
import PaymentsHome from "./Payments/PaymentsHome";
import { NavigationContainer } from "@react-navigation/native";

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
        name='PaymentsHome'
        component={PaymentsHome}
        options={paymentsScreenOptions}
      />

        <Tab.Screen
          name='Account'
          component={Account}
          options={accountScreenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthorizedViews;
