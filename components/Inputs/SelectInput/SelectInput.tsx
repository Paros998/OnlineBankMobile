import React, { FC } from 'react';
import { FormControl, IFormControlProps } from "native-base";
import { useField } from "formik";
import { SelectOption } from '../../../interfaces/SelectOption';
import { Select, SelectProps } from "antd";

interface SelectInputProps extends SelectProps<string> {
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
      <Select
        {...field}
        {...props}
        value={field.value}
      >
        {
          options.map((option) => (
            <Select.Option key={option.value} value={option.value} >
              {option.label}
            </Select.Option>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default SelectInput;
