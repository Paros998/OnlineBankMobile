import React from 'react';
import {Center, Heading, View} from "native-base";

const Account = () => {
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
          <View
            h='full'
            w="full"
            p={5}
            bgColor='primary_dark.500'
            rounded={'2xl'}
          >

            <Center>
              Hello there
            </Center>

          </View>
        </View>
      </View>
    </View>
  );
};

export default Account;
