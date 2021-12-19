import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Payments from "./Payments";
import Transfers from "./Transfers";
import History from "./History";
import CyclicalTransfers from "./CyclicalTransfers";

const Drawer = createDrawerNavigator();

const PaymentsHome = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Payments"
      screenOptions={{
        headerStyle:{
          height: 50,
          backgroundColor: '#d51111',
          borderBottomColor: '#d51111',

        },drawerStyle:{
          backgroundColor: '#800000',
          maxWidth: '75%'
        },drawerContentStyle:{
          padding: 5,
        },drawerActiveTintColor: '#bfbfbf',
        drawerInactiveTintColor: '#737373',
        headerTintColor : '#bfbfbf'

      }}
    >
      <Drawer.Screen name="Payments" options={{title:'Płatności'}} component={Payments}/>
      <Drawer.Screen name="Transfers" options={{title:'Przelewy'}} component={Transfers}/>
      <Drawer.Screen name="CyclicalTransfers" options={{title:'Zdefiniowane przelewy'}} component={CyclicalTransfers}/>
      <Drawer.Screen name="History" options={{title:'Historia'}} component={History}/>
    </Drawer.Navigator>
  );
};

export default PaymentsHome;