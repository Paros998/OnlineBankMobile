import React, { FC, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QrCodeScanner from './QRCodeScanner';
import TransfersQrPreview from './TransfersQRPreview';
import TransfersFormik from './TransfersFormik';

const Stack = createNativeStackNavigator();

const Transfers: FC = () => {
  const [initialAmount, setInitialAmount] = useState(0);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='QRPreview'
    >
      <Stack.Screen name='QRPreview' component={TransfersQrPreview} />

      <Stack.Screen name='QRCodeScanner'>
        {() => <QrCodeScanner setInitialAmount={setInitialAmount} />}
      </Stack.Screen>

      <Stack.Screen name='Form'>
        {() => <TransfersFormik initialAmount={initialAmount} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Transfers;
