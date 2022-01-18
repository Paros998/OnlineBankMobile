import React from 'react';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import Payments from './Payments';
import Transfers from './Transfers';
import History from './History';
import CyclicalTransfers from './CyclicalTransfers';

const Drawer = createDrawerNavigator();

const drawerNavigationOptions: DrawerNavigationOptions = {
  headerStyle: {
    backgroundColor: '#d51111',
    borderBottomColor: '#d51111',
  },
  drawerStyle: {
    backgroundColor: '#252728',
  },
  drawerActiveTintColor: '#f2f2f2',
  drawerInactiveTintColor: '#d9d9d9',
  headerTintColor: '#f2f2f2',
};

const PaymentsHome = () => (
  <Drawer.Navigator screenOptions={drawerNavigationOptions} initialRouteName="Payments">
    <Drawer.Screen
      name="Payments"
      options={{ title: 'Płatności' }}
      component={Payments}
    />

    <Drawer.Screen
      name="Transfers"
      options={{ title: 'Przelewy' }}
      component={Transfers}
    />

    <Drawer.Screen
      name="CyclicalTransfers"
      options={{ title: 'Zdefiniowane przelewy' }}
      component={CyclicalTransfers}
    />

    <Drawer.Screen
      name="History"
      options={{ title: 'Historia' }}
      component={History}
    />
  </Drawer.Navigator>
);

export default PaymentsHome;
