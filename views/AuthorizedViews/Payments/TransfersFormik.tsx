import React, { FC } from 'react';
import { useToast, View } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { TransferData } from '../../../interfaces/TransferData';
import Logo from '../../../components/Logo/Logo';
import TransferForm from '../../../components/Forms/TransferForm/TransferForm';
import { PaymentsRoutes } from '../../../enums/PaymentsRoutes';
import { FormRouteParams } from '../../../interfaces/FormRouteParams';
import { useTransferPostItems } from '../../../hooks/useTransferPostItems';

const validationSchema = Yup.object().shape({
  amount: Yup.number().required('Kwota jest wymagana').positive('Kwota nie może być ujemna'),
  category: Yup.string().required('Kategoria jest wymagana'),
  receiver_sender: Yup.string().required('Odbiorca jest wymagany'),
  title: Yup.string().required('Tytuł przelewu jest wymagany'),
  toAccountNumber: Yup.string().required('Number konta odbiorcy jest wymagany')
    .min(26, 'Numer konta posiada za mało cyfr')
    .max(26, 'Numer konta posiada za dużo cyfr')
});

interface TransfersFormikProps {
  transferRouteName: string;
}

const TransfersFormik: FC<TransfersFormikProps> = ({ transferRouteName }) => {
  const route = useRoute<RouteProp<FormRouteParams, PaymentsRoutes.Form>>();
  const toast = useToast();
  const getPostItems = useTransferPostItems(transferRouteName);

  const initialFormikValues: TransferData = {
    amount: route.params.initialAmount,
    category: '',
    receiver_sender: '',
    title: '',
    toAccountNumber: ''
  };

  const handleSubmit = async (values: TransferData) => {
    const { operationAfterSuccess, successMessage, postValues, endpoint } = getPostItems(values);
    try {
      await axios.post(endpoint, postValues);
      operationAfterSuccess();
      toast.show({ title: successMessage, status: 'success' });
    } catch {
      toast.show({ title: 'Coś poszło nie tak', status: 'error' });
    }
  };

  return (
    <View
      height='100%'
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Logo position='absolute' top='16' />

      <Formik<TransferData>
        initialValues={initialFormikValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <TransferForm
          transferRouteName={transferRouteName}
          initialValue={route.params.initialAmount}
        />
      </Formik>
    </View>
  );
};

export default TransfersFormik;
