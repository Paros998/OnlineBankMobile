import React from 'react';
import { Form, useFormikContext } from "formik";
import { HistorySearchFormikValues } from "../../../interfaces/HistorySearchFormikValues";
import SelectInput from "../../Inputs/SelectInput/SelectInput";
import { TransfersCategoriesModel } from "../../../interfaces/TransfersCategoriesModel";
import { useDropdown } from "../../../hooks/useDropdown";

const HistorySearchForm = () => {
  const { handleSubmit, setFieldValue } = useFormikContext<HistorySearchFormikValues>();
  const transferOptions = useDropdown<TransfersCategoriesModel>('/rest/transfers/categories');

  return (
    <Form style={{ width: '100%' }}>
      <SelectInput
        name='transferCategory'
        label='Wybierz kategorie płatności'
        inputWrapperProps={{ top: '24' }}
        options={transferOptions || []}
        onValueChange={(currentOption) => {
          setFieldValue('transferCategory', currentOption);
          handleSubmit();
        }}
      />
    </Form>
  );
};

export default HistorySearchForm;
