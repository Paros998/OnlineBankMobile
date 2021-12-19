import React, { FC } from "react";
import { Heading, VStack } from "native-base";
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

      <TransferRecords transfers={transfers || []} />

      <CenteredSpinner color='white' isPending={isPending} />
    </VStack>
  );
};

export default RecentTransactions;
