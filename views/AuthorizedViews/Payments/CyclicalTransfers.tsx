import React, {FC} from 'react';
import Logo from "../../../components/Logo/Logo";
import {Button, ScrollView, View} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {useCurrentUser} from "../../../contexts/CurrentUserProvider";
import {useFetchRawData} from "../../../hooks/useFetchRawData";
import {CyclicalTransferModel} from "../../../interfaces/CyclicalTransferModel";
import CenteredSpinner from "../../../components/CenteredSpinner/CenteredSpinner";
import CyclicalTransferRecords from "../../../records/CyclicalTransferRecords/CyclicalTransferRecords";

interface CyclicalTransfersProps {
  rawData: CyclicalTransferModel[];
  isPending: boolean;
  fetchData: () => {};
}

const CyclicalTransfers:FC<CyclicalTransfersProps> = ({fetchData,rawData,isPending}) => {
  const navigation = useNavigation();

  return (
    <View
      width={"full"}
      h='full'
      backgroundColor='primary_dark.600'
      alignItems='center'
      color='dark.400'
      p={2}
    >
      <Logo mt={1}/>

      <ScrollView
        w="full"
        height="full"
        mt='8'
        contentContainerStyle={{
          alignItems: "center"
        }}
      >

        <CenteredSpinner
          isPending={isPending}
          color='dark.800'
          size='xl'
        />
        <CyclicalTransferRecords
          cyclicalTransfers={rawData || []}
          updateTransfers={fetchData}
        />

      </ScrollView>

      <Button
        mt='8'
        mb='8'
        rounded='full'
        _pressed={{bgColor: 'light.700'}}
        bgColor='dark.800'
        colorScheme='light'
        width="1/3"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Wstecz
      </Button>
    </View>
  );
};

export default CyclicalTransfers;