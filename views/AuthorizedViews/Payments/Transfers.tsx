import React from 'react';
import { Button, useToast, View } from 'native-base';
import Logo from "../../../components/Logo/Logo";
import {useNavigation, useRoute} from "@react-navigation/native";
import TransferForm from "../../../components/Forms/TransferForm/TransferForm";
import {Formik} from "formik";
import {TransferData} from "../../../interfaces/TransferData";
import {TransferDataInitialValues} from "../../../constants/TransferDataInitialValues";
import * as Yup from "yup";
import axios from "axios";
import {TransferModel} from "../../../interfaces/TransferModel";
import {useCurrentUser} from "../../../contexts/CurrentUserProvider";
import moment from 'moment';
import {TransferType} from "../../../enums/TransferType";
import {CyclicalTransferModel} from "../../../interfaces/CyclicalTransferModel";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Kwota jest wymagana").positive("Kwota nie może być ujemna"),
  category: Yup.string().required("Kategoria jest wymagana"),
  receiver_sender: Yup.string().required("Odbiorca jest wymagany"),
  title: Yup.string().required("Tytuł przelewu jest wymagany"),
  toAccountNumber: Yup.string().required("Number konta odbiorcy jest wymagany").max(23, "Ten numer konta jest niepoprawny").min(23, "Ten numer konta jest niepoprawny"),
});

const Transfers = () => {
  const route = useRoute();
  const {currentUser} = useCurrentUser();
  const navigation = useNavigation();
  const toast = useToast();
  let params: { type: string };

  if (route.params)
    params = route.params as { type: string };
  else params = {type: 'normal'}

  const handleSubmit = async ({title,transferDate,category,receiver_sender,toAccountNumber,amount}:TransferData) => {

    if(currentUser){
      if (params.type === 'normal' ) {

        const body:TransferModel = {
          amount: amount,
          transferDate: moment().toISOString(),
          category: category,
          type: TransferType.Outgoing,
          receiver_sender: receiver_sender,
          title: title,
          toAccountNumber: toAccountNumber,
          client: currentUser
        }

        const response = await axios.post(`/transfers`,body);

        if (response.status === 200) {

          toast.show({
            title: "👍 Zrealizowano przelew",
            status: 'success',
          });

          navigation.navigate('History' as never);

        }else {
          toast.show({
            title: "Coś poszło nie tak",
            status: 'error',
          });
        }
      } else {

        const body:CyclicalTransferModel = {
          amount: amount,
          reTransferDate: moment(transferDate).toISOString(),
          category: category,
          receiver: receiver_sender,
          title: title,
          accountNumber: toAccountNumber,
          client: currentUser
        }

        const response = await axios.post(`/transfers`,body);

        if (response.status === 200) {

          toast.show({
            title: "👍 Zapisano przelew cykliczny",
            status: 'success',
          });

          navigation.navigate('CyclicalTransfers' as never);

        }else {
          toast.show({
            title: "Coś poszło nie tak",
            status: 'error',
          });
        }
      }

    }else
      toast.show({
        title: "Coś poszło nie tak",
        status: 'error',
      });

  }

  return (
    <View
      height={"full"}
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Logo position="fixed" top="16"/>

      <Formik<TransferData>
        initialValues={TransferDataInitialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <TransferForm type={params.type}/>
      </Formik>

      <Button
        mt={5}
        rounded='full'
        colorScheme='secondary'
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

export default Transfers;
