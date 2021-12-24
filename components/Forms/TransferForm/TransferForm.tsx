import React, {FC, useState} from 'react';
import {Form, useFormikContext} from "formik";
import {Button, FormControl, ScrollView, useToast, View, VStack} from "native-base";
import {Input, SubmitButton} from "@native-base/formik-ui";
import {TransferData} from "../../../interfaces/TransferData";
import {DatePicker,Select } from 'antd';
import {useFetchRawData} from "../../../hooks/useFetchRawData";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Platform} from "react-native";

interface TransferFormProps{
  type:string;
}

const TransferForm:FC<TransferFormProps> = ({type}) => {
  const {errors, setFieldValue, resetForm} = useFormikContext<TransferData>();
  const [hasPermission,setHasPermission] = useState<string | null>(null);
  const [scanning,setScanning] = useState(false);
  const toast = useToast();

  const {rawData} = useFetchRawData<string[]>("/rest/transfers/categories");

  const handleBarCodeScanned = ({type,data}) => {
    setScanning(false);
    setFieldValue("amount",data);
    console.log(type,data)
  }

  return (

    <Form
      style={{width: "100%", height: "80%", marginTop: "60px"}}
    >
      <ScrollView
        w={"full"}
        height={"full"}
        mb={"16"}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <VStack
          mt={3}
          backgroundColor='primary.500'
          w={"5/6"}
          h={"container"}
          rounded={"xl"}
          p={2}
          pt={5}
          pb={5}
          justifyContent={"center"}
          space={4}
        >
          <FormControl isRequired isInvalid={errors.amount as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Kwota
            </FormControl.Label>
            <Input
              name='amount'
              color='dark.800'
              backgroundColor='light.50'
              size="xl"
              placeholder={'450,78 ...'}
            />
            <FormControl.ErrorMessage>
              {errors.amount}
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            onPress={async () => {
              if(!hasPermission){
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                if (status === 'granted') {
                  setHasPermission(status);
                }else{
                  toast.show({
                    title: "Nie uzyskano pozwolenia na skanowanie!",
                    status: 'info'
                  });
                  return;
                }
              }

              setScanning(true);

            }}
            rounded="full"
            colorScheme='light'
            bgColor='primary_dark.600'

            _disabled={{
              bgColor: 'secondary.400'
            }}

            _pressed={{
              bgColor: 'dark.800'
            }}

           disabled={Platform.OS === 'web' }
          >
            QR Skan Kwoty
          </Button>

          {Platform.OS !== 'web' && <BarCodeScanner
              style={BarCodeScanner.Constants.Type.style}
              onBarCodeScanned={handleBarCodeScanned}
          />}

          {
            type === "cyclical" && (
              <FormControl isRequired isInvalid={errors.transferDate as never}>
                <FormControl.Label _text={{fontSize: "xl"}}>
                  Data realizacji cyklicznej
                </FormControl.Label>
                <DatePicker
                  format={"YYYY-MM-DD"}
                  onChange={(date) => {
                    setFieldValue("transferDate",date);
                  }}
                />
                <FormControl.ErrorMessage>
                  {errors.transferDate}
                </FormControl.ErrorMessage>
              </FormControl>
            )
          }

          <FormControl isRequired isInvalid={errors.category as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Kategoria
            </FormControl.Label>

            <Select
              style={{
                backgroundColor: 'light.50'
              }}
              placeholder='Kategoria'
              onChange={(itemValue) => {
                setFieldValue("category", itemValue);
              }}
            >
              {
                rawData && rawData.length > 0 && rawData.map((value,key) => (
                      <Select.Option
                        key={key}
                        value={value}
                      >
                        {value}
                      </Select.Option>
                  )
                )
              }
            </Select>

            <FormControl.ErrorMessage>
              {errors.category}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.receiver_sender as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Odbiorca
            </FormControl.Label>
            <Input
              name='receiver_sender'
              color='dark.800'
              backgroundColor='light.50'
              size="xl"
              placeholder={'Jan Kowalski ...'}
            />
            <FormControl.ErrorMessage>
              {errors.receiver_sender}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.title as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Tytuł
            </FormControl.Label>
            <Input
              name='title'
              color='dark.800'
              backgroundColor='light.50'
              size="xl"
              placeholder={'Opłata prąd, lipiec ...'}
            />
            <FormControl.ErrorMessage>
              {errors.title}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={errors.toAccountNumber as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Rachunek odbiorcy
            </FormControl.Label>
            <Input
              name='toAccountNumber'
              color='dark.800'
              backgroundColor='light.50'
              size="xl"
              placeholder={'001501235121233231...'}
            />
            <FormControl.ErrorMessage>
              {errors.toAccountNumber}
            </FormControl.ErrorMessage>
          </FormControl>


        </VStack>
        <View
          w={"full"}
          alignItems={'center'}
        >
          <SubmitButton
            mt={5}
            rounded='full'
            colorScheme='primary'
            width="1/2"
          >
            {type === 'normal' ? 'Wykonaj' : "Zapisz"}
          </SubmitButton>
          <Button
            mt={3}
            mb={5}
            rounded='full'
            colorScheme='light'
            variant={'subtle'}
            width="1/2"
            onPress={() => {
              resetForm();
            }}
          >
            Resetuj
          </Button>
        </View>
      </ScrollView>
    </Form>
  )
};

export default TransferForm;
