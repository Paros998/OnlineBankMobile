import React, { FC } from "react";
import { Box, Card, Heading, Text, VStack } from "native-base";

const getCashColor = (amount: number) => amount > 0 ? 'green.500' : 'black';

const payments = [
  {
    receiver: 'Sklep Spożywczy Basia',
    category: 'Wydatki bieżące',
    cash: -12.59,
  },
  {
    receiver: 'Warsztat Auto-Części',
    category: 'Wydatki bieżące',
    cash: -990,
  },
  {
    receiver: 'Wynagrodzenie',
    category: 'Zarobki',
    cash: 3330,
  },
];

const RecentTransactions: FC = () => {
  return (
    <VStack p={10} mt='20'>
      <Heading textAlign='center'>
        Ostatnie transakcje
      </Heading>

      {
        payments.map(({ receiver, category, cash }) => (
          <Card
            rounded='lg'
            mt='5'
            shadow={2}
            backgroundColor='white'
          >
            <Box
              justifyContent='space-between'
              flexDirection='row'
            >
              <Box>
                <Heading color='black' fontSize={15}>
                  {receiver}
                </Heading>

                <Text color='gray.500'>
                  {category}
                </Text>
              </Box>

              <Heading color={getCashColor(cash)} fontSize={15}>
                {cash.toFixed(2)} PLN
              </Heading>
            </Box>
          </Card>
        ))
      }
    </VStack>
  );
};

export default RecentTransactions;
