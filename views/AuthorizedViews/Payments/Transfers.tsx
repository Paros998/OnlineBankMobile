import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrCodeScanner from './QRCodeScanner';
import TransfersQrPreview from './TransfersQRPreview';
import TransfersFormik from './TransfersFormik';
import { useRoute } from '@react-navigation/native';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';

const Stack = createNativeStackNavigator();

const Transfers: FC = () => {
  const route = useRoute();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={PaymentsRoutes.QRPreview}
    >
      <Stack.Screen name={PaymentsRoutes.QRPreview} component={TransfersQrPreview} />

      <Stack.Screen name={PaymentsRoutes.QRCodeScanner} component={QrCodeScanner} />

      <Stack.Screen name={PaymentsRoutes.Form}>
        {() => <TransfersFormik transferRouteName={route.name} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Transfers;
