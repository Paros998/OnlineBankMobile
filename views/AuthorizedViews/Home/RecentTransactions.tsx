import React, { FC } from "react";
import { Box, Card, Heading, Text, VStack } from "native-base";
import { useFetchRawData } from "../../../hooks/useFetchRawData";
import { TransferModel } from "../../../interfaces/TransferModel";
import { useCurrentUser } from "../../../contexts/CurrentUserProvider";
import CenteredSpinner from "../../../components/CenteredSpinner/CenteredSpinner";
import {TransferType} from "../../../enums/TransferType";

const getCashColor = (type:string) => type === TransferType.Incoming ? 'green.500' : 'primary.500';

const RecentTransactions: FC = () => {
  const { currentUser } = useCurrentUser();
  const { rawData: transfers, isPending } = useFetchRawData<TransferModel[]>(
    `/transfers/recent/client/${currentUser?.clientId}`
  );
  return (
    <VStack p={10} mt='20'>
      <Heading textAlign='center'>
        Ostatnie transakcje
      </Heading>

      {
        transfers?.map((transfer) => (
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

      <CenteredSpinner color='white' isPending={isPending} />
    </VStack>
  );
};

export default RecentTransactions;
