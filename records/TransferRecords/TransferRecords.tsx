import React, { FC } from 'react';
import { Box, Card, Heading, IBoxProps, Text } from "native-base";
import { TransferModel } from "../../interfaces/TransferModel";
import { TransferType } from "../../enums/TransferType";
import CenteredSpinner from '../../components/CenteredSpinner/CenteredSpinner';

interface TransferRecordsProps extends IBoxProps {
  transfers: TransferModel[];
  isPending: boolean;
}

const getCashColor = (type:string) => type === TransferType.Incoming ? 'green.500' : 'primary.500';

const TransferRecords: FC<TransferRecordsProps> = ({ transfers, isPending,...props }) => {
  if (isPending) {
    return (
      <CenteredSpinner
        wrapperProps={{ h: 'auto' }}
        isPending={isPending}
        color='primary.400'
        size='lg'
      />
    );
  }

  return (
    <Box {...props}>
      {
        transfers.map((transfer, index) => (
          <Card
            rounded='lg'
            mt={index && 5}
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
