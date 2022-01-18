import React, { FC, useState } from 'react';
import { Button, Center, Heading, useToast, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Platform } from 'react-native';

const TransfersQrPreview: FC = () => {
  const navigation = useNavigation();
  const [ hasPermission, setHasPermission ] = useState<string | null>(null);
  const toast = useToast();

  const handleShowQRScanner = async () => {
    if (!hasPermission) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(status);
      } else {
        toast.show({
          title: 'Nie uzyskano pozwolenia na skanowanie!',
          status: 'info'
        });
        return;
      }
    }
    navigation.navigate('QRCodeScanner' as never);
  };

  return (
    <View bgColor='dark.800'>
      <Center h='full'>
        <Heading color='pink.500'>Posiadasz kod QR kwoty? Zeskanuj ją za pomocą naszego skanera.</Heading>

        <Button
          mt={5}
          colorScheme='primary'
          onPress={handleShowQRScanner}
          disabled={Platform.OS === 'web'}
        >
          Rozpocznij skanowanie
        </Button>

        <Button
          mt={5}
          colorScheme='secondary'
          onPress={() => navigation.navigate('Form' as never)}
        >
          Pomiń skanowanie
        </Button>
      </Center>
    </View>
  );
};

export default TransfersQrPreview;
