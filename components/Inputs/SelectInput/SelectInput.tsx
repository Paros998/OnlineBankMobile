import React, { FC } from 'react';
import { FormControl, IFormControlProps, ISelectProps, Select } from "native-base";
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
      <Select
        {...field}
        {...props}
        selectedValue={field.value}
      >
        {
          options.map((option) => (
            <Select.Item key={option.value} {...option} />
          ))
        }
      </Select>
    </FormControl>
  );
};

export default SelectInput;
