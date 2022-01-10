import React, {FC} from 'react';
import {Divider, Heading} from "native-base";
import {Formik} from "formik";

import {HelpPropsInterface} from "../../../../interfaces/HelpPropsInterface";
import RemindLoginForm from "../../../../components/Forms/HelpForms/RemindLoginForm";

const Login:FC<HelpPropsInterface> = ({formikValues,handleSubmit,validationSchema}) => {
  return (
    <>
      <Heading
        mt={"1/6"}
        mb={1}
        color='light.50'
        fontSize={"2xl"}
      >
        Przypomnij Login
      </Heading>
      <Formik<UserEmail>
        initialValues={formikValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <RemindLoginForm />
      </Formik>
      <Divider my={4} w={"3/4"} backgroundColor='light.50'/>
    </>
  );
};

export default Login;
