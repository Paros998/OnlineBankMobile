import React, {useState} from 'react';
import {Button, Center, useToast, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import Logo from "../../../components/Logo/Logo";
import Login from "./HelpType/Login";
import Password from "./HelpType/Password";
import axios from "axios";
import * as Yup from "yup";

const formikValues: UserEmail = {
  email: ''
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email jest wymagany")
    .min(5, "Email musi posiadać co najmniej 5 znaków")
    .email("To nie jest adres email")
});

const Help = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [form, setForm] = useState<string>('');
  const [requestUrl, setRequestUrl] = useState<string>()

  const handleSubmit = async ({email}: UserEmail) => {
    try {
      const response = await axios.patch(`users/${requestUrl}`, email);
      if (response.status === 200) {

        toast.show({
          title: "👍 Sukces, sprawdź swoją pocztę.",
          status: 'success',
        });

        navigation.navigate("Login" as never);
      }
    } catch (e) {
      toast.show({
        title: "👎 Użytkownik z takim emailem nie istnieje.",
        status: 'error',
      });
    }
  }

  return (
    <View
      height={"full"}
      w='full'
      backgroundColor='primary_dark.600'
      alignItems='center'
      justifyContent='center'
    >
      <Logo position="fixed" top="10"/>

      {form === '' &&
      <Center
          bgColor='dark.800'
          w='full'
          h='1/4'
          p={3}
          alignContent='space-evenly'
      >
          <Button
              w='5/6'
              _text={{fontSize: 'lg'}}
              rounded='lg'
              onPress={() => {
                setForm('remindLogin');
                setRequestUrl('login');
              }}
          >
              Przypomnij Login
          </Button>
          <Button
              w='5/6'
              _text={{fontSize: 'lg'}}
              rounded='lg'
              mt={4}
              onPress={() => {
                setForm('resetPassword');
                setRequestUrl('password');
              }}
          >
              Resetuj Hasło
          </Button>
      </Center>
      }

      {form !== '' &&
      <Center
          bgColor='dark.800'
          w='full'
          h='1/2'
          p={3}
          alignContent='space-evenly'
      >
        {form === 'remindLogin'
          ? <Login
            formikValues={formikValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
          />
          : <Password
            formikValues={formikValues}
            validationSchema={validationSchema}
            handleSubmit={handleSubmit}
          />}

          <Button
              w='2/5'
              colorScheme='primary'
              rounded='full'

              onPress={() => setForm('')}
          >
              Wstecz
          </Button>
      </Center>
      }

      <Button
        _pressed={{bgColor: 'light.700'}}
        bgColor='dark.800'
        colorScheme='light'
        rounded='full'
        onPress={() => navigation.goBack()}
        width={"2/5"}
        position={"fixed"}
        bottom='16'
        mb={3}
      >
        Wróć
      </Button>
    </View>
  );
};

export default Help;