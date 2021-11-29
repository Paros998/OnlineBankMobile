import React, {FC} from 'react';
import {FormControl, View, VStack} from "native-base";
import {Form, useFormikContext} from "formik";
import {UserCredentials} from "../../../interfaces/UserCredentials";
import {
  Input,
  SubmitButton,
} from '@native-base/formik-ui';

const LoginForm: FC = () => {
  const {errors} = useFormikContext<UserCredentials>();

  return (
    <Form
    style={{width:"100%"}}
    >
      <View
        w={"full"}
        alignItems={"center"}
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
          <FormControl isRequired isInvalid={errors.username as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Login
            </FormControl.Label>
            <Input
              name='username'
              color='dark.800'
              backgroundColor='light.50'
              size="xl"
              placeholder={'Login... '}
            />
            <FormControl.ErrorMessage>
              {errors.username}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl mt={5} isRequired isInvalid={errors.password as never}>
            <FormControl.Label _text={{fontSize: "xl"}}>
              Hasło
            </FormControl.Label>
            <Input
              name='password'
              type='password'
              color='dark.800'
              backgroundColor='light.50'
              placeholder='Hasło...'
              size="xl"
            />
            <FormControl.ErrorMessage>
              {errors.password}
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
            Zaloguj
          </SubmitButton>
        </View>
      </View>
    </Form>
  )
};

export default LoginForm;