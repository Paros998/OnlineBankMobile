import React from 'react';
import { useFormikContext } from 'formik';
import { Box } from 'native-base';
import { HistorySearchFormikValues } from '../../../interfaces/HistorySearchFormikValues';
import SelectInput from '../../Inputs/SelectInput/SelectInput';
import { paymentCategoryOptions } from '../../../constants/paymentCategoryOptions';
import { TransfersCategoriesModel } from '../../../interfaces/TransfersCategoriesModel';
import { useDropdown } from '../../../hooks/useDropdown';

const HistorySearchForm = () => {
  const { handleSubmit, setFieldValue } = useFormikContext<HistorySearchFormikValues>();
  const transferOptions = useDropdown<TransfersCategoriesModel>('/rest/transfers/categories');

  return (
    <Box style={{ width: '100%', padding: '6%', marginTop: 60 }}>
      <SelectInput
        name='transferCategory'
        label='Wybierz kategorie płatności'
        inputWrapperProps={{ top: '10' }}
        options={transferOptions || []}
        onValueChange={(currentOption) => {
          setFieldValue('transferCategory', currentOption);
          handleSubmit();
        }}
      />
    </Box>
  );
};

export default HistorySearchForm;
