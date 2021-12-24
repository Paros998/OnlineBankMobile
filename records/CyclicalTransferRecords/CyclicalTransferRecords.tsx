import React, {FC, useState} from 'react';
import {CyclicalTransferModel} from "../../interfaces/CyclicalTransferModel";
import {Button, Center, HStack, Modal, Pressable, Text, useToast, View, VStack} from "native-base";
import {useFetchRawData} from "../../hooks/useFetchRawData";
import {paymentCategoryColors} from "../../constants/paymentCategoryColors";
import axios from "axios";

interface CyclicalTransferRecordsProps {
  cyclicalTransfers: CyclicalTransferModel[] | [];
  updateTransfers: () => {};
}

const CyclicalTransferRecords: FC<CyclicalTransferRecordsProps> = ({cyclicalTransfers, updateTransfers}) => {
  const [showModal, setShowModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [transfer, setTransfer] = useState<CyclicalTransferModel>();
  const {rawData} = useFetchRawData<string[]>("/rest/transfers/categories");
  const toast = useToast();

  const pickTransferColor = () => {
    let color = 'light.50';
    if (rawData && transfer) {
      switch (transfer.category) {
        case rawData[0]:
          color = paymentCategoryColors.Wynagrodzenie;
          break;
        case rawData[1]:
          color = paymentCategoryColors.Rachunki;
          break;
        case rawData[2]:
          color = paymentCategoryColors.Wydatki_Biezace
          break;
        case rawData[3]:
          color = paymentCategoryColors.Rozrywka
          break;
        case rawData[4]:
          color = paymentCategoryColors.Zdrowie
          break;
        case rawData[5]:
          color = paymentCategoryColors.Inne
          break;
      }
    }
    return color;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.delete(`/cyclical-transfers/${transfer?.transferId}`);
      if (response.status === 200) {

        toast.show({
          title: 'Pomyślnie usunięto przelew zdefiniowany.',
          status: 'success'
        })

        setShowSubmitModal(false);
        setShowModal(false);

        updateTransfers();
      }

    } catch (e: any) {
      toast.show({
        title: "Wystąpił błąd:" + e.message,
        status: 'error'
      })
    }
  }

  return (
    <>
      <Modal
        isOpen={showSubmitModal}
        onClose={() => {
          setShowSubmitModal(false);
        }}
        closeOnOverlayClick
        w='full'
        h='full'
      >
        <Modal.Content
          w='4/5'
          bgColor='dark.800'
        >
          <Modal.Header>
            <Text>
              Czy napewno chcesz usunąć dany przelew?
            </Text>
          </Modal.Header>

          <Modal.Body>
            <HStack
              justifyContent={"center"}
              space={"1"}
            >
              <Button
                colorScheme={'light'}
                onPress={() => {
                  setShowSubmitModal
                  (
                    false);
                }}
              >
                Wróć
              </Button>

              <Button
                colorScheme={'danger'}
                onPress={handleSubmit}
              >
                Potwierdź
              </Button>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        w='full'
        h='full'
        closeOnOverlayClick
        bgColor='primary_dark.700'
      >
        <Modal.Content
          w='4/5'
          h='4/5'
          bgColor="dark.800"
        >
          <Modal.CloseButton colorScheme='dark'/>
          <Modal.Header
            bgColor="dark.800"
            color='light.50'
          >
            Szczegóły transferu nr:
            <Text
              color='primary.500'
              fontWeight='bold'
              fontSize={"2xl"}
              textAlign={'center'}
            >
              {transfer?.transferId}
            </Text>
          </Modal.Header>

          <Modal.Body
            bgColor="dark.800"
            color='light.50'
          >
            <Text
              fontWeight='bold'
              fontSize={"xl"}
            >
              Tytuł:
            </Text>
            <Text
              fontSize={"md"}
            >
              {transfer?.title}
            </Text>

            <Text
              fontWeight='bold'
              fontSize={"xl"}
              mt={3}
            >
              Kwota przelewu:
            </Text>
            <Text
              fontSize={"md"}
            >
              {transfer?.amount}
            </Text>

            <Text
              fontWeight='bold'
              fontSize={"xl"}
              mt={3}
            >
              Odbiorca:
            </Text>
            <Text
              fontSize={"md"}
            >
              {transfer?.receiver}
            </Text>

            <Text
              fontWeight='bold'
              fontSize={"xl"}
              mt={3}
            >
              Rachunek Odbiorcy:
            </Text>
            <Text
              fontSize={"md"}
            >
              {transfer?.accountNumber}
            </Text>

            <Text
              fontWeight='bold'
              fontSize={"xl"}
              mt={3}
            >
              Kategoria:
            </Text>
            <Text
              fontSize={"md"}
              color={pickTransferColor()}
            >
              {transfer?.category}
            </Text>

            <Text
              fontWeight='bold'
              fontSize={"xl"}
              mt={3}
            >
              Data ponownej realizacji:
            </Text>
            <Text
              fontSize={"md"}
            >
              {transfer?.reTransferDate}
            </Text>
          </Modal.Body>

          <Modal.Footer
            bgColor="dark.800"
            color='light.50'
          >
            <Button
              variant="ghost"
              colorScheme='light'
              onPress={() => {
                setShowModal(false);
              }}
            >
              Wstecz
            </Button>
            <Button
              bgColor='primary.500'
              _pressed={{
                bgColor: 'light.50',
              }}
              colorScheme={'dark'}
              onPress={() => {
                setShowSubmitModal(true);
              }}
            >
              Usuń
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {
        cyclicalTransfers.map((value,key) => (
          <Pressable
            key={key}
            w='4/5'
            onPress={() => {
              setTransfer(value);
              setShowModal(true);
            }}
            bgColor='dark.800'
            color='light.50'
            rounded='lg'
            _pressed={{
              bgColor: 'light.600',
            }}
            p={3}
            mb={4}
          >
            <VStack>
              <HStack justifyContent='space-between'>
                <Text
                  fontWeight={"bold"}
                >
                  Tytuł:
                </Text>
                <Text>
                  {value.title}
                </Text>
              </HStack>

              <HStack justifyContent='space-between'>
                <Text
                  fontWeight={"bold"}
                >
                  Kwota przelewu:
                </Text>
                <Text>
                  {value.amount} PLN
                </Text>
              </HStack>

              <HStack justifyContent='space-between'>
                <Text
                  fontWeight={"bold"}
                >
                  Odbiorca:
                </Text>
                <Text>
                  {value.receiver}
                </Text>
              </HStack>
            </VStack>
          </Pressable>
        ))
      }
    </>
  )
    ;
};

export default CyclicalTransferRecords;