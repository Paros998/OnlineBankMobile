import React from 'react';
import {Input, SubmitButton} from "@native-base/formik-ui";
import {Form, useFormikContext} from 'formik';
import {FormControl, View} from "native-base";

const RemindLoginForm = () => {
  const {errors} = useFormikContext<UserEmail>();
  return (
    <Form
      style={{width: "100%"}}
    >
      <View
        w={"full"}
        alignItems={"center"}
      >
        <FormControl isRequired isInvalid={errors.email as never} w={"4/5"}>
          <FormControl.Label _text={{fontSize: "xl"}}>
            Email
          </FormControl.Label>
          <Input
            name='email'
            color='dark.800'
            backgroundColor='light.50'
            size="xl"
            placeholder={'Email... '}
          />
          <FormControl.ErrorMessage>
            {errors.email}
          </FormControl.ErrorMessage>
        </FormControl>

        <SubmitButton
          mt={5}
          rounded='full'
          _text={{fontSize: 'lg'}}
          colorScheme='primary'
          width="1/2"
        >
          Wyślij
        </SubmitButton>
      </View>
    </Form>
  );
};

export default RemindLoginForm;