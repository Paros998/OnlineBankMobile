import React from 'react';
import {
  ArrowDownIcon,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  Input,
  View,
  VStack
} from "native-base";
import {UserCredentials} from "../../../interfaces/UserCredentials";
import {UserCredentialsValidation} from "../../../interfaces/UserCredentialsValidation";

const Login = () => {

  const [data,setData] = React.useState<UserCredentials>({
    login: '' ,
    password: ''
  });

  const [errors,setErrors] = React.useState<UserCredentialsValidation>({
    login: false ,
    password: false
  });

  const validate = () => {
    if(data.login.length <= 0){
      setErrors({
        ...errors,
        login: true
      });

    }else{
      setErrors({
        ...errors,
        login: false
      });
    }

    if(data.password.length <= 0){
      setErrors({
        ...errors,
        password: true
      });
    }else{
      setErrors({
        ...errors,
        password: false
      });
    }

    if(errors.login || errors.password)
      return false;

    return  true;
  }

  const onSubmit = () => {
    validate() ? console.log('Validation true') : console.log('Validation false');
  }

  return (
    <View
      backgroundColor='light.400'
      width={"full"}
      height={"full"}
      p={'0.5'}

    >
      <View
        height={"full"}
        backgroundColor='dark.800'
        alignItems='center'
      >
        <Heading
          mt={4}
          mb={3}
          color='light.50'
          fontSize={"5xl"}
        >
          Logowanie
        </Heading>

        <VStack
          space={4}
          mt={3}
          backgroundColor='primary.500'
          width='4/5'
          rounded={"xl"}
          height={'2/5'}
          p={3}
          pt={5}
          pb={5}
        >
          <FormControl isRequired>
            <FormControl.Label >
              Login
            </FormControl.Label>
            <Input
              color='dark.800'
              backgroundColor={'light.50'}
              placeholder={'Login...'}
              onChangeText={
                (value) => setData({...data,login: value})
              }
            />
            {errors.login ?
            <FormControl.ErrorMessage _text={{fontSize: 'xs',color:'light.50',fontWeight: 500}}>
                Login nie może być pusty!
            </FormControl.ErrorMessage>
              : <FormControl.HelperText _text={{fontSize: 'xs'}}>
                Nazwa do logowania
              </FormControl.HelperText>
            }
          </FormControl>

          <FormControl mt={5} isRequired>
            <FormControl.Label>
              Hasło
            </FormControl.Label>
            <Input
              type='password'
              color='dark.800'
              backgroundColor={'light.50'}
              placeholder={'Hasło...'}
              onChangeText={
                (value) => setData({...data,password: value})
              }
            />
            {errors.password ?
              <FormControl.ErrorMessage  _text={{fontSize: 'xs',color:'light.100',fontWeight: 500}}>
                Hasło nie może być puste!
            </FormControl.ErrorMessage>
              : <FormControl.HelperText _text={{fontSize: 'xs'}}>
                Hasło do logowania
              </FormControl.HelperText>
            }
          </FormControl>

        </VStack>
        <Button
          mt={5}
          rounded='full'
          colorScheme='primary'
          width={"1/2"}
          onPress={onSubmit}
        >
          Zaloguj
        </Button>

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
    </View>
  );
};

export default Login;