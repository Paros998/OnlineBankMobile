import React, { useState } from 'react';
import Logo from "../../../components/Logo/Logo";
import { Box, Button, ScrollView, View } from "native-base";
import { Formik } from "formik";
import { HistorySearchFormikValues } from "../../../interfaces/HistorySearchFormikValues";
import HistorySearchForm from "../../../components/Forms/HistorySearchForm/HistorySearchForm";
import TransferRecords from "../../../records/TransferRecords/TransferRecords";
import CenteredSpinner from "../../../components/CenteredSpinner/CenteredSpinner";
import { useCurrentUser } from "../../../contexts/CurrentUserProvider";
import { useFetchRawData } from "../../../hooks/useFetchRawData";
import { TransferModel } from "../../../interfaces/TransferModel";
import { useNavigation } from "@react-navigation/native";

const initialFormikValues: HistorySearchFormikValues = {
  transferCategory: '',
};

const History = () => {
  const { currentUser } = useCurrentUser();
  const navigation = useNavigation();
  const [historyParams, setHistoryParams] = useState<HistorySearchFormikValues>();
  const { rawData: transfers, isPending } = useFetchRawData<TransferModel[]>(
    `/transfers/client/${currentUser?.clientId}`,
    historyParams
  );

  const handleSubmit = (values: HistorySearchFormikValues) => {
    setHistoryParams(values);
  };

  return (
    <View
      width={"full"}
      h='full'
      backgroundColor='primary_dark.600'
      alignItems='center'
      color='dark.400'
      p={2}
    >
      <Logo position="fixed" top="16"/>

      <Formik<HistorySearchFormikValues>
        initialValues={initialFormikValues}
        onSubmit={handleSubmit}
      >
        <HistorySearchForm/>
      </Formik>

      <ScrollView
        w="full"
        height="full"
        mt='8'
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <Box paddingLeft='6' paddingRight='6' w='full'>
          <TransferRecords transfers={transfers || []}/>

          <CenteredSpinner
            isPending={isPending}
            color='dark.800'
            size='xl'
          />
        </Box>
      </ScrollView>

      <Button
        mt='8'
        mb='8'
        rounded='full'
        _pressed={{bgColor: 'light.700'}}
        bgColor='dark.800'
        colorScheme='light'
        width="1/3"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Wstecz
      </Button>
    </View>
  );
};

export default History;
