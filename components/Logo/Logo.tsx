import React, { FC } from 'react';
import { Box, HStack, IBoxProps, Image, Text } from "native-base"

const img = require("../../assets/logo.png");

const Logo: FC<IBoxProps> = (props) => {
  return (
    <Box {...props}>
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
