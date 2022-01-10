import React, {FC} from 'react';
import {HelpPropsInterface} from "../../../../interfaces/HelpPropsInterface";
import {Divider, Heading} from "native-base";
import {Formik} from "formik";
import ResetPasswordForm from "../../../../components/Forms/HelpForms/ResetPasswordForm";

const Password:FC<HelpPropsInterface> = ({formikValues,handleSubmit,validationSchema}) => {
  return (
    <>
      <Heading
        mt={"1/6"}
        mb={1}
        color='light.50'
        fontSize={"2xl"}
      >
        Resetuj Hasło
      </Heading>
      <Formik<UserEmail>
        initialValues={formikValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ResetPasswordForm/>
      </Formik>
      <Divider my={4} w={"3/4"} backgroundColor='light.50'/>
    </>
  );
};

export default Password;
