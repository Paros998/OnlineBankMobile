import React, { FC } from 'react';
import { Heading, VStack } from 'native-base';
import { useFetchRawData } from '../../../hooks/useFetchRawData';
import { TransferModel } from '../../../interfaces/TransferModel';
import { useCurrentUser } from '../../../contexts/CurrentUserProvider';
import TransferRecords from '../../../records/TransferRecords/TransferRecords';

const RecentTransactions: FC = () => {
  const { currentUser } = useCurrentUser();
  const { rawData: transfers, isPending } = useFetchRawData<TransferModel[]>(
    `/transfers/recent/client/${currentUser?.clientId}`
  );
  return (
    <VStack p={10} mt='16'>
      <Heading textAlign='center' mb='4'>
        Ostatnie transakcje
      </Heading>

      <TransferRecords isPending={isPending} transfers={transfers || []} />
    </VStack>
  );
};

export default RecentTransactions;
