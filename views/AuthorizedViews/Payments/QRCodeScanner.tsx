import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, useToast, View } from 'native-base';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

interface QrCodeScannerProps {
  setInitialAmount: Dispatch<SetStateAction<number>>;
}

const QrCodeScanner: FC<QrCodeScannerProps> = ({ setInitialAmount }) => {
  const navigation = useNavigation();
  const toast = useToast();
  const [ scanData, setScanData ] = useState(false);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    setScanData(true);

    if (!isNaN(Number.parseFloat(data))) {
      setInitialAmount(Number.parseFloat(data));
      toast.show({
        title: `Zeskanowano wartość: ${Number.parseFloat(data)}`,
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
    <View w='full' h='3/4'>
      <BarCodeScanner
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {
        scanData && (
          <Button
            mt='5'
            rounded='full'
            onPress={() => setScanData(false)}
          >
            Zeskanuj ponownie
          </Button>
        )
      }

      <Button
        mt='4'
        colorScheme='secondary'
        rounded='full'
        onPress={navigation.goBack}
      >
        Wróć do formularzu
      </Button>
    </View>
  );
};

export default QrCodeScanner;
