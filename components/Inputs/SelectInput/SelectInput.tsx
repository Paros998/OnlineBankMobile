import React, { FC } from 'react';
import { FormControl, IFormControlProps, ISelectProps, Select } from 'native-base';
import { useField } from "formik";
import { SelectOption } from '../../../interfaces/SelectOption';

interface SelectInputProps extends ISelectProps {
  name: string;
  label: string;
  inputWrapperProps?: IFormControlProps;
  options: SelectOption[];
}

const SelectInput: FC<SelectInputProps> = ({ name, label, inputWrapperProps, options, ...props }) => {
  const [field] = useField(name);
  return (
    <FormControl {...inputWrapperProps}>
      <FormControl.Label>{label}</FormControl.Label>
      <Select {...field} {...props}>
        {
          options.map((option) => (
            <Select.Item
              label={option.label}
              key={option.value}
              value={option.value}
            />
          ))
        }
      </Select>
    </FormControl>
  );
};

export default SelectInput;
