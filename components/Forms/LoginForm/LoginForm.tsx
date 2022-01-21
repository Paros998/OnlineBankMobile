import React from 'react';
import { Input, SubmitButton } from '@native-base/formik-ui';
import { FormControl, View, VStack } from 'native-base';

const LoginForm = () => {
  return (
    <View
      w={'full'}
      alignItems={'center'}
    >
      <VStack
        mt={3}
        backgroundColor="primary.500"
        w={'5/6'}
        rounded={'xl'}
        p={2}
        pt={5}
        pb={5}
        justifyContent={'center'}
        space={4}
      >
        <FormControl isRequired>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Login
          </FormControl.Label>
          <Input
            name="username"
            color="dark.800"
            backgroundColor="light.50"
            size="xl"
            placeholder={'Login... '}
          />
        </FormControl>

        <FormControl mt={5} isRequired>
          <FormControl.Label _text={{ fontSize: 'xl' }}>
            Hasło
          </FormControl.Label>
          <Input
            name="password"
            type="password"
            color="dark.800"
            backgroundColor="light.50"
            placeholder="Hasło..."
            size="xl"
          />
        </FormControl>

      </VStack>
      <View
        w={'full'}
        alignItems={'center'}
      >
        <SubmitButton
          mt={5}
          rounded="full"
          colorScheme="primary"
          width="1/2"
        >
          Zaloguj
        </SubmitButton>
      </View>
    </View>
  );
};

export default LoginForm;
