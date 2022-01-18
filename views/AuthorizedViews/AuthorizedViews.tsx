import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './Account/Account';
import PaymentsHome from './Payments/PaymentsHome';
import Home from './Home/Home';

const Tab = createBottomTabNavigator();

const navigatorOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabBarLabelPosition: 'below-icon',
  tabBarActiveTintColor: 'red',
  tabBarInactiveTintColor: 'black',
};

const homeScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, focused }) => (
    <Ionicons
      name="home-outline"
      size={size + 5}
      color={focused ? 'red' : 'black'}
    />
  ),
  title: 'Strona główna',
};

const paymentsScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, focused}) => (
    <FontAwesome5
      name="money-bill-alt"
      size={size + 5}
      color={focused ? 'red' : 'black'}
    />
  ),
  title: 'Płatności',
};

const accountScreenOptions: BottomTabNavigationOptions = {
  tabBarIcon: ({ size, focused }) => (
    <Ionicons
      name="person-outline"
      size={size + 5}
      color={focused ? 'red' : 'black'}
    />
  ),
  title: 'Konto',
};

const AuthorizedViews = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={navigatorOptions}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={homeScreenOptions}
        />

        <Tab.Screen
          name="PaymentsHome"
          component={PaymentsHome}
          options={paymentsScreenOptions}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={accountScreenOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthorizedViews;
