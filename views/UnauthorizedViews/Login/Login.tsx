import React, {FC} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowDownIcon,
  Button,
  Center,
  Divider,
  Heading,
  View,
  useToast
} from "native-base";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {Formik} from 'formik';
import * as SecureStore from 'expo-secure-store';
import * as Yup from "yup";
import {appendUrlSearchParams} from "../../../utils/appendUrlSearchParams";
import LoginForm from "../../../components/Forms/LoginForm/LoginForm";
import {UserCredentials} from "../../../interfaces/UserCredentials";
import {User} from "../../../interfaces/User";
import Logo from "../../../components/Logo/Logo";
import { useCurrentUser } from "../../../contexts/CurrentUserProvider";
import {Roles} from "../../../enums/Roles";

const formikValues: UserCredentials = {
  username: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Login jest wymagany").min(3, "Login musi zawierać co najmniej 3 znaki"),
  password: Yup.string()
    .required("Hasło jest wymagane").min(3, "Hasło musi zawierać co najmniej 3 znaki"),
});

const Login: FC = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const currentUser = useCurrentUser();

  const handleSubmit = async (values: UserCredentials) => {
    const loginParams = appendUrlSearchParams(values);

    try {
      const response = await axios.post(`/login`, loginParams);

      if (response.status === 200) {
        const token = response.headers["authorization"];
        const user: User = jwtDecode(token);
        const role = user.authorities[0].authority;

        if(role !== Roles.RoleClient){
          toast.show({
            title: "Nie można zalogować się jako pracownik do aplikacji klienta!",
            status: 'warning'
          });
          return;
        }

        toast.show({
          title: "👍 Sukces logowania",
          status: 'success',
        });

        axios.defaults.headers.common['Authorization'] = token;

        Platform.OS === 'web'
          ? localStorage.setItem("JWT_USER_TOKEN", token)
          : await SecureStore.setItemAsync("JWT_USER_TOKEN", token);

        await currentUser?.fetchUser();
      }
    } catch (e: any) {
      toast.show({
        title: '👎 Nie udało się zalogować',
        status: 'error',
      });
    }
  }

  return (
    <View
      height={"full"}
      w='full'
      backgroundColor='dark.800'
      alignItems='center'
      justifyContent='center'
    >
      <Button
        rounded='full'
        mt='12'
        onPress={() => navigation.navigate('Sandbox' as never)}
      >
        Sandbox
      </Button>

      <Logo position="fixed" top="10" />

      <Heading
        mt={"1/6"}
        mb={1}
        color='light.50'
        fontSize={"2xl"}
      >
        Logowanie
      </Heading>

      <Formik<UserCredentials>
        initialValues={formikValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <LoginForm/>
      </Formik>

      <Divider my={4} w={"3/4"} backgroundColor='light.50'/>

      <Center>
        <Heading color='light.50' fontSize={"lg"} mb={3}>
          Problemy z zalogowaniem?
        </Heading>
        <ArrowDownIcon size={'xl'} color='light.50'/>
        <Button
          mt={3}
          rounded='full'
          colorScheme='primary'
          width={"2/3"}
          onPress={() => navigation.navigate('Help' as never)}
        >
          Pomoc
        </Button>
      </Center>
    </View>
  );
};

export default Login;
