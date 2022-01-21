import React from 'react';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import Payments from './Payments';
import Transfers from './Transfers';
import History from './History';
import CyclicalTransfers from './CyclicalTransfers';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';

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
  <Drawer.Navigator
    screenOptions={drawerNavigationOptions}
    initialRouteName={PaymentsRoutes.Payments}
  >
    <Drawer.Screen
      name={PaymentsRoutes.Payments}
      options={{ title: 'Płatności', unmountOnBlur: true }}
      component={Payments}
    />

    <Drawer.Screen
      name={PaymentsRoutes.NewTransfer}
      options={{ title: 'Wykonaj przelew jednorazowy', unmountOnBlur: true }}
      component={Transfers}
    />

    <Drawer.Screen
      name={PaymentsRoutes.NewCyclicalTransfer}
      options={{ title: 'Swtórz nowy przelew cykliczny', unmountOnBlur: true }}
      component={Transfers}
    />

    <Drawer.Screen
      name={PaymentsRoutes.CyclicalTransfers}
      options={{ title: 'Twoje przelewy cykliczne', unmountOnBlur: true }}
      component={CyclicalTransfers}
    />

    <Drawer.Screen
      name={PaymentsRoutes.History}
      options={{ title: 'Historia', unmountOnBlur: true }}
      component={History}
    />
  </Drawer.Navigator>
);

export default PaymentsHome;
