import React from 'react';
import {Box, HStack, Image, Text} from "native-base"

const img = require("../../assets/logo.png");

const Logo = () => {
  return (
    <Box position="fixed" top="10">
      <HStack alignItems={"center"}>
        <Image
        source={img}
        alt='logo'
        w="12"
        h="12"
        />
        <Text color='light.50' ml={2} fontSize={"2xl"}>
          Future Bank
        </Text>
      </HStack>
    </Box>
  );
};

export default Logo;