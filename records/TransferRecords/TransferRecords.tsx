import React, { FC } from 'react';
import { Box, Card, Heading, IBoxProps, Text } from "native-base";
import { TransferModel } from "../../interfaces/TransferModel";
import { TransferType } from "../../enums/TransferType";

interface TransferRecordsProps extends IBoxProps {
  transfers: TransferModel[];
}

const getCashColor = (type:string) => type === TransferType.Incoming ? 'green.500' : 'primary.500';

const TransferRecords: FC<TransferRecordsProps> = ({ transfers, ...props }) => {
  return (
    <Box {...props}>
      {
        transfers.map((transfer) => (
          <Card
            rounded='lg'
            mt='5'
            shadow={2}
            backgroundColor='white'
            key={transfer.transferId}
          >
            <Box
              justifyContent='space-between'
              flexDirection='row'
            >
              <Box>
                <Heading color='black' fontSize={15}>
                  {transfer.receiver_sender}
                </Heading>

                <Text color='gray.500'>
                  {transfer.category}
                </Text>
              </Box>

              <Heading color={getCashColor(transfer.type)} fontSize={15}>
                {transfer.amount.toFixed(2)} PLN
              </Heading>
            </Box>
          </Card>
        ))
      }
    </Box>
  );
};

export default TransferRecords;
