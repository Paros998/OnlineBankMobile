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
import Home from "../../AuthorizedViews/Home/Home";

const formikValues: UserCredentials = {
  username: '',
  password: ''
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is Required").min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is Required").min(3, "Password must be at least 3 characters"),
});

const Login: FC = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const handleSubmit = async (values: UserCredentials) => {
    const loginParams = appendUrlSearchParams(values);

    try {
      const response = await axios.post(`/login`, loginParams);

      if (response.status === 200) {
        const token = response.headers["authorization"];
        const user: User = jwtDecode(token);
        const role = user.authorities[0].authority;
        //const token = await SecureStore.getItemAsync('JWT_USER_TOKEN'); na póżniej

        toast.show({
          title: "👍 Sukces logowania",
          status: 'success',
        });

        axios.defaults.headers.common['Authorization'] = token;

        Platform.OS === 'web'
          ? localStorage.setItem("JWT_USER_TOKEN", token)
          : await SecureStore.setItemAsync("JWT_USER_TOKEN", token);

        navigation.navigate('Home' as never);

        //await currentUser?.fetchUser();
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
        >
          Pomoc
        </Button>
      </Center>
    </View>
  );
};

export default Login;
