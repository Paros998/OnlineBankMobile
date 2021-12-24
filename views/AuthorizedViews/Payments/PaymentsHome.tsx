import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Payments from "./Payments";
import Transfers from "./Transfers";
import History from "./History";
import CyclicalTransfers from "./CyclicalTransfers";
import {useFetchRawData} from "../../../hooks/useFetchRawData";
import {CyclicalTransferModel} from "../../../interfaces/CyclicalTransferModel";
import {useCurrentUser} from "../../../contexts/CurrentUserProvider";

const Drawer = createDrawerNavigator();

const PaymentsHome = () => {
  const {currentUser} = useCurrentUser();
  const {rawData,isPending,fetchData} =
    useFetchRawData<CyclicalTransferModel[]>(`/cyclical-transfers/client/${currentUser?.clientId}`)
  return (
    <Drawer.Navigator
      initialRouteName="Payments"
      screenOptions={{
        headerStyle:{
          height: 50,
          backgroundColor: '#d51111',
          borderBottomColor: '#d51111',

        },drawerStyle:{
          backgroundColor: '#252728',
          maxWidth: '75%'
        },drawerContentStyle:{
          padding: 5,
        },drawerActiveTintColor: '#f2f2f2',
        drawerInactiveTintColor: '#d9d9d9',
        headerTintColor : '#f2f2f2'

      }}
    >
      <Drawer.Screen name="Payments" options={{title:'Płatności'}} component={Payments} />
      <Drawer.Screen name="Transfers" options={{title:'Przelewy'}}
                     component={()=> <Transfers fetchData={fetchData} /> }
      />
      <Drawer.Screen name="CyclicalTransfers" options={{title:'Zdefiniowane przelewy'}}
                     component={()=> <CyclicalTransfers rawData={rawData || []} isPending={isPending} fetchData={fetchData} />}
      />
      <Drawer.Screen name="History" options={{title:'Historia'}} component={History}/>
    </Drawer.Navigator>
  );
};

export default PaymentsHome;