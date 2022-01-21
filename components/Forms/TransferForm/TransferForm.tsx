import React, { FC, useState } from 'react';
import { Input, SubmitButton } from '@native-base/formik-ui';
import { Button, FormControl, HStack, ScrollView, Select, VStack } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import moment from 'moment';
import { TransferData } from '../../../interfaces/TransferData';
import { useFetchRawData } from '../../../hooks/useFetchRawData';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';

interface TransferFormProps {
  transferRouteName: string;
  initialValue: number;
}

const reactNativeInputStyle = {
  color: 'white',
  padding: 10,
  borderColor: 'gray',
  width: '100%',
  borderWidth: 1,
  borderRadius: 5,
  fontSize: 19,
};

const TransferForm: FC<TransferFormProps> = ({ transferRouteName, initialValue }) => {
  const { errors, setFieldValue, resetForm, values } = useFormikContext<TransferData>();
  const [shouldShowDatePicker, setShouldShowDatePicker] = useState(false);
  const { rawData } = useFetchRawData<string[]>('/rest/transfers/categories');

  return (
    <ScrollView
      w={'full'}
      mt="32"
      p={0}
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <VStack
        w="100%"
        h="100%"
        p={2}
        justifyContent="center"
        space={8}
      >
        <FormControl isRequired isInvalid={errors.amount as never}>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Kwota
          </FormControl.Label>

          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => setFieldValue('amount', value)}
            defaultValue={String(initialValue)}
            style={reactNativeInputStyle}
            placeholderTextColor="gray"
            placeholder={'450,78 ...'}
          />

          <FormControl.ErrorMessage>
            {errors.amount}
          </FormControl.ErrorMessage>
        </FormControl>

        {
          transferRouteName === PaymentsRoutes.NewCyclicalTransfer && (
            <FormControl isRequired isInvalid={errors.transferDate as never}>
              <FormControl.Label _text={{ fontSize: 'xl' }}>
                Data realizacji cyklicznej
              </FormControl.Label>

              <Button onPress={() => setShouldShowDatePicker(true)}>
                {values.transferDate || 'Wybierz datę przelewu cyklicznego'}
              </Button>

              {
                shouldShowDatePicker && (
                  <DateTimePicker
                    value={moment(values.transferDate).toDate()}
                    display="default"
                    onChange={(event: any, date: Date | undefined) => {
                      setShouldShowDatePicker(false);
                      setFieldValue('transferDate', moment(date).format('YYYY-MM-DD'));
                    }}
                  />
                )
              }

              <FormControl.ErrorMessage>
                {errors.transferDate}
              </FormControl.ErrorMessage>
            </FormControl>
          )
        }

        <FormControl isRequired isInvalid={errors.category as never}>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Kategoria
          </FormControl.Label>

          <Select
            placeholder="Kategoria"
            fontSize={19}
            onValueChange={(itemValue) => {
              setFieldValue('category', itemValue);
            }}
          >
            {
              rawData?.map((value, key) => (
                  <Select.Item
                    key={key}
                    label={value}
                    value={value}
                  >
                    {value}
                  </Select.Item>
                ),
              ) ?? []
            }
          </Select>

          <FormControl.ErrorMessage>
            {errors.category}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.receiver_sender as never}>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Odbiorca
          </FormControl.Label>
          <Input
            name="receiver_sender"
            size="xl"
            placeholder={'Jan Kowalski ...'}
          />
          <FormControl.ErrorMessage>
            {errors.receiver_sender}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.title as never}>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Tytuł
          </FormControl.Label>
          <Input
            name="title"
            size="xl"
            placeholder={'Opłata prąd, lipiec ...'}
          />
          <FormControl.ErrorMessage>
            {errors.title}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.toAccountNumber as never}>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Rachunek odbiorcy
          </FormControl.Label>
          <Input
            name="toAccountNumber"
            size="xl"
            placeholder={'001501235121233231...'}
          />
          <FormControl.ErrorMessage>
            {errors.toAccountNumber}
          </FormControl.ErrorMessage>
        </FormControl>

        <HStack space={4}>
          <SubmitButton
            rounded="full"
            colorScheme="primary"
            width="48%"
          >
            {transferRouteName === PaymentsRoutes.NewTransfer ? 'Wykonaj' : 'Zapisz'}
          </SubmitButton>
          <Button
            rounded="full"
            colorScheme="light"
            variant={'subtle'}
            width="48%"
            onPress={() => {
              resetForm();
            }}
          >
            Resetuj
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default TransferForm;
