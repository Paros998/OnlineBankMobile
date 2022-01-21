import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, useToast, View, VStack } from 'native-base';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormRouteParams } from '../../../interfaces/FormRouteParams';

const QrCodeScanner: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<FormRouteParams>>();
  const toast = useToast();
  const [shouldScanAgain, setShouldScanAgain] = useState(false);
  const [scannedData, setScannedData] = useState(0);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    setShouldScanAgain(true);
    const parsedData = Number.parseFloat(data);

    if (!isNaN(parsedData) && parsedData > 0) {
      setScannedData(parsedData);
      toast.show({
        title: `Zeskanowano wartość: ${parsedData}`,
        status: 'success'
      });
    } else {
      toast.show({
        title: 'Zeskanowano błędny kod QR. Spróbuj ponownie',
        status: 'error'
      });
    }
  };

  return (
    <View w='full' h='full'>
      <BarCodeScanner
        onBarCodeScanned={shouldScanAgain ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <VStack justifyContent='flex-end' alignItems='center' w='full' h='full' pb='5'>
        {
          scannedData > 0 && (
            <Button
              mt='5'
              colorScheme='success'
              rounded='full'
              w='1/2'
              onPress={() => navigation.replace(
                PaymentsRoutes.Form,
                { initialAmount: scannedData }
              )}
            >
              <Text>Przejdź do formularzu</Text>
            </Button>
          )
        }

        {
          shouldScanAgain && (
            <Button
              mt='5'
              rounded='full'
              w='1/2'
              onPress={() => setShouldScanAgain(false)}
            >
              <Text>Zeskanuj ponownie</Text>
            </Button>
          )
        }

        <Button
          mt='5'
          colorScheme='secondary'
          rounded='full'
          w='1/2'
          onPress={navigation.goBack}
        >
          <Text>Wróć</Text>
        </Button>
      </VStack>
    </View>
  );
};

export default QrCodeScanner;
