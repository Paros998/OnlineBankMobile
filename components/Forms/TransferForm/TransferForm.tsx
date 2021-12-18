import React from 'react';
import {Form, useFormikContext} from "formik";
import {Button, FormControl, ScrollView, Select, View, VStack} from "native-base";
import SelectControl, {Icon, Input, SubmitButton} from "@native-base/formik-ui";
import {TransferData} from "../../../interfaces/TransferData";
import {useNavigation} from "@react-navigation/native";


const TransferForm = () => {
  const {errors,handleChange} = useFormikContext<TransferData>()
  const navigation = useNavigation();

  return (
    <Form
      style={{width:"100%"}}
    >
      <ScrollView
        w={"full"}
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

          <FormControl mt={5} isRequired isInvalid={errors.category as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Kategoria
            </FormControl.Label>
            <Select
              color='dark.800'
              backgroundColor='light.50'
              placeholder='Kategoria'
              onValueChange={(itemValue) => {
                handleChange(itemValue);
              }}
            >
              <Select.Item label="Wynagrodzenie" value="Wynagrodzenie" />
              <Select.Item label="Twoja Stara" value="Twoja Stara" />
            </Select>
            <FormControl.ErrorMessage>
              {errors.category}
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
            Wykonaj
          </SubmitButton>
          <Button
            mt={5}
            rounded='full'
            colorScheme='secondary'
            width="1/3"
            onPress={()=>{
              navigation.goBack();
            }}
          >
            Wstecz
          </Button>
        </View>
      </ScrollView>
    </Form>
  )
};

export default TransferForm;