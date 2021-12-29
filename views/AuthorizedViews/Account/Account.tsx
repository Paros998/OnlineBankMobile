import React from 'react';
import {ScrollView, Text, View, VStack} from "native-base";
import {useCurrentUser} from "../../../contexts/CurrentUserProvider";
import {Divider} from "native-base";
import Moment from "react-moment";

const Account = () => {

  const {currentUser} = useCurrentUser();
  const {
    clientId, email, fullName, homeAddress, dateOfBirth, dateOfCreation,
    identificationNumber, personalNumber, numberOfCreditsCards, postalCode, city, secHomeAddress, secPostalCode, secCity
  } = currentUser || {}
  return (
    <View
      h='full'
      w="full"
      p={5}
      bgColor='primary_dark.900'
    >
      <View
        h='full'
        w="full"
        p={5}
        bgColor='primary_dark.800'
        rounded={'2xl'}
      >
        <View
          h='full'
          w="full"
          p={5}
          bgColor='primary_dark.700'
          rounded={'2xl'}
        >
          <ScrollView
            h='full'
            w="full"
            p={5}
            bgColor='primary_dark.500'
            rounded={'2xl'}
            color={'light.50'}
            pb={8}
          >
            <Text
              textAlign={"center"}
              color='light.100'
              fontSize={"lg"}
              fontWeight={"bold"}
            >
              Witaj na stronie klienta
            </Text>

            <Text
              mt={4}
              fontSize={'md'}
              color='primary_dark.900'
              fontWeight={"bold"}
            >
              {'Sczegóły konta nr. '}
              <Text
                color={'light.100'}
                fontSize={'xl'}
              >
                {clientId}
              </Text>
            </Text>

              <VStack
                space={'4'}>
                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Imię i Nazwisko:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {fullName}
                  </Text>
                </VStack>

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Pesel:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {personalNumber}
                  </Text>
                </VStack>

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Numer Dowodu:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {identificationNumber}
                  </Text>
                </VStack>

                <Divider
                  bgColor={'dark.800'}
                />

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Data Urodzenia:
                  </Text>
                  <Text
                    ml={2}
                  >
                    <Moment
                      format={'YYYY-MM-DD'}
                    >
                      {dateOfBirth}
                    </Moment>
                  </Text>
                </VStack>

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Data Utworzenia:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {dateOfCreation}
                  </Text>
                </VStack>

                <Divider
                  bgColor={'dark.800'}
                />

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Adres Email:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {email}
                  </Text>
                </VStack>

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Adres:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {city + ' ,  ' + postalCode + '\n' + homeAddress}
                  </Text>
                </VStack>

                <Divider
                  bgColor={'dark.800'}
                />

                <VStack>
                  <Text
                    fontWeight={"bold"}
                    textDecorationLine={"underline"}
                  >
                    Adres Korespondencyjny:
                  </Text>
                  <Text
                    ml={2}
                  >
                    {secCity + ' ,  ' + secPostalCode + '\n' + secHomeAddress}
                  </Text>
                </VStack>
              </VStack>
          </ScrollView>
        </View>
      </View>
    </View>
  )
    ;
};

export default Account;
