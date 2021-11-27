import React, { FC } from 'react';
import { Button, ButtonProps} from "react-native";
import {Spinner} from 'native-base';
import { useFormikContext } from "formik";

const SubmitButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button
      {...props}
      disabled={isSubmitting}

    >
      {isSubmitting && (
        <Spinner
          size="sm"
          mr={2}
        />
      )}
      {children}
    </Button>
  );
};

export default SubmitButton;