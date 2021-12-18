import React from 'react';
import {Center, View} from 'native-base';
import Logo from "../../../components/Logo/Logo";
import {useRoute} from "@react-navigation/native";
import TransferForm from "../../../components/Forms/TransferForm/TransferForm";
import {Formik} from "formik";
import {TransferData} from "../../../interfaces/TransferData";
import {TransferDataInitialValues} from "../../../constants/TransferDataInitialValues";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Kwota jest wymagana").positive("Kwota nie może być ujemna"),
  category: Yup.string().required("Kategoria jest wymagana"),
  receiver: Yup.string().required("Odbiorca jest wymagany"),
  title: Yup.string().required("Tytuł przelewu jest wymagany"),
  toAccountNumber: Yup.string().required("Number konta odbiorcy jest wymagany").max(23,"Ten numer konta jest niepoprawny").min(23,"Ten numer konta jest niepoprawny")
});

const Transfers = () => {
  const route = useRoute();
  let params:{type:string};

  if(route.params)
    params = route.params as {type:string};
  else params = {type: 'normal'}

  const handleSubmit = async () =>{

    if(params.type === 'normal'){

    }else{

    }

  }

  return (
    <View
      height={"full"}
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
      p={2}
    >
      <Logo position="fixed" top="16" />
        {params.type === 'normal'
          ? (
            <Formik<TransferData>
              initialValues={TransferDataInitialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <TransferForm/>
            </Formik>
          )
          : (
            <Formik<TransferData>
              initialValues={TransferDataInitialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <TransferForm/>
            </Formik>
          )
        }
    </View>
  );
};

export default Transfers;
