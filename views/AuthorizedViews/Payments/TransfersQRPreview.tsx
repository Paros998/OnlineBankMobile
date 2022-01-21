import React, { FC, useState } from 'react';
import { Button, Center, Heading, Image, Text, useToast, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Platform } from 'react-native';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormRouteParams } from '../../../interfaces/FormRouteParams';
import scanImage from '../../../assets/scan-qr.png';

const TransfersQrPreview: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<FormRouteParams>>();
  const [hasPermission, setHasPermission] = useState<string | null>(null);
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
    navigation.navigate(PaymentsRoutes.QRCodeScanner as never);
  };

  return (
    <View bgColor='dark.800'>
      <Center h='full' p={5}>
        <Image source={scanImage} alt='Scan icon' w='1/2' h='1/2' />

        <Heading textAlign='center' mt='5' color='white'>
          Posiadasz kod QR kwoty?
        </Heading>

        <Text textAlign='center' fontSize={18}>
          Zeskanuj ją za pomocą naszego skanera.
        </Text>

        <Button
          w='1/2'
          mt={5}
          colorScheme='primary'
          onPress={handleShowQRScanner}
          disabled={Platform.OS === 'web'}
        >
          Rozpocznij skanowanie
        </Button>

        <Button
          w='1/2'
          mt={5}
          colorScheme='secondary'
          onPress={() => navigation.navigate(PaymentsRoutes.Form, { initialAmount: 0 })}
        >
          Pomiń skanowanie
        </Button>
      </Center>
    </View>
  );
};

export default TransfersQrPreview;
