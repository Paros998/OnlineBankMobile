import React, { FC } from 'react';
import { ErrorMessage, useField } from "formik";
import { FormControl, IFormControlProps, IInputProps, Text } from "native-base";
import { Input } from "@native-base/formik-ui";

interface TextInputProps extends IInputProps {
  name: string;
  label: string;
  inputWrapperProps?: IFormControlProps;
}

const TextInput: FC<TextInputProps> = ({ name, label, inputWrapperProps , ...props }) => {
  const [field] = useField(name);
  return (
    <FormControl {...inputWrapperProps}>
      <FormControl.Label _text={{fontSize: "xl"}}>
        {label}
      </FormControl.Label>

      <Input
        color='dark.800'
        backgroundColor='light.50'
        size="xl"
        {...field}
        {...props}
      />

      <ErrorMessage name={name}>
        {
          (errorMessage) => (
            <Text color='white'>{errorMessage}</Text>
          )
        }
      </ErrorMessage>
    </FormControl>
  );
};

export default TextInput;
