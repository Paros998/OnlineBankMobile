import React, { FC } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCurrentUser } from '../../../contexts/CurrentUserProvider';
import { useToast, View } from 'native-base';
import { TransferData } from '../../../interfaces/TransferData';
import { TransferModel } from '../../../interfaces/TransferModel';
import { CyclicalTransferModel } from '../../../interfaces/CyclicalTransferModel';
import moment from 'moment';
import { TransferType } from '../../../enums/TransferType';
import { ClientModel } from '../../../interfaces/ClientModel';
import axios from 'axios';
import Logo from '../../../components/Logo/Logo';
import { Formik } from 'formik';
import TransferForm from '../../../components/Forms/TransferForm/TransferForm';
import * as Yup from 'yup';

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
  initialAmount: number;
}

const TransfersFormik: FC<TransfersFormikProps> = ({ initialAmount }) => {
  const route = useRoute();
  const { currentUser, fetchUser } = useCurrentUser();
  const navigation = useNavigation();
  const toast = useToast();
  let params: { type: string };

  if (route.params)
    params = route.params as { type: string };
  else params = { type: 'normal' };

  const initialFormikValues: TransferData = {
    amount: initialAmount,
    category: "",
    receiver_sender: "",
    title: "",
    toAccountNumber: ""
  };

  const handleSubmit = async (values: TransferData) => {
    const isNormalTransfer = params.type === 'normal';
    let postValues: TransferModel | CyclicalTransferModel;
    let endpoint: string;
    let successMessage: string;
    let operationAfterSuccess: () => void | Promise<void>;

    if (isNormalTransfer) {
      postValues = {
        ...values,
        transferDate: moment().toISOString(),
        type: TransferType.Outgoing,
        client: currentUser || {} as ClientModel
      };
      endpoint = '/transfers';
      successMessage = '👍 Zrealizowano przelew';
      operationAfterSuccess = fetchUser;
    } else {
      postValues = {
        ...values,
        reTransferDate: moment(values.transferDate).toISOString(),
        receiver: values.receiver_sender,
        accountNumber: values.toAccountNumber,
        client: currentUser || {} as ClientModel
      };
      endpoint = '/cyclical-transfers';
      successMessage = '👍 Zrealizowano przelew cykliczny';
      operationAfterSuccess = () => navigation.navigate('CyclicalTransfers' as never);
    }

    try {
      await axios.post(endpoint, postValues);
      await operationAfterSuccess();
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
        <TransferForm type={params.type} />
      </Formik>
    </View>
  );
};

export default TransfersFormik;
