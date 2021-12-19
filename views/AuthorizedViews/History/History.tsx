import React, { useState } from 'react';
import { Box, Center, View } from "native-base";
import { HistorySearchFormikValues } from "../../../interfaces/HistorySearchFormikValues";
import { Formik } from 'formik';
import HistorySearchForm from "../../../components/Forms/HistorySearchForm/HistorySearchForm";
import Logo from "../../../components/Logo/Logo";
import { useFetchRawData } from "../../../hooks/useFetchRawData";
import { TransferModel } from "../../../interfaces/TransferModel";
import { useCurrentUser } from "../../../contexts/CurrentUserProvider";
import CenteredSpinner from "../../../components/CenteredSpinner/CenteredSpinner";
import TransferRecords from "../../../records/TransferRecords/TransferRecords";

const initialFormikValues: HistorySearchFormikValues = {
  transferCategory: '',
};

const History = () => {
  const { currentUser } = useCurrentUser();
  const [historyParams, setHistoryParams] = useState<HistorySearchFormikValues>();
  const { rawData: transfers, isPending } = useFetchRawData<TransferModel[]>(
    `/transfers/client/${currentUser?.clientId}`,
    historyParams
  );

  const handleSubmit = (values: HistorySearchFormikValues) => {
    setHistoryParams(values);
  };

  return (
    <View backgroundColor='dark.800' h='full'>
      <Center padding='8'>
        <Logo position="fixed" top="10"/>

        <Formik<HistorySearchFormikValues>
          initialValues={initialFormikValues}
          onSubmit={handleSubmit}
        >
          <HistorySearchForm/>
        </Formik>

        <Box top="32" w='full'>
          <TransferRecords transfers={transfers || []} />

          <CenteredSpinner
            isPending={isPending}
            color='white'
            size='lg'
          />
        </Box>
      </Center>
    </View>
  );
};

export default History;
