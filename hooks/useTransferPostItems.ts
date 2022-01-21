import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { PaymentsRoutes } from '../enums/PaymentsRoutes';
import { TransferModel } from '../interfaces/TransferModel';
import { CyclicalTransferModel } from '../interfaces/CyclicalTransferModel';
import { TransferType } from '../enums/TransferType';
import { ClientModel } from '../interfaces/ClientModel';
import { useCurrentUser } from '../contexts/CurrentUserProvider';
import { FormRouteParams } from '../interfaces/FormRouteParams';
import { TransferData } from '../interfaces/TransferData';

export const useTransferPostItems = (transferRouteName: string) => {
  const { currentUser, fetchUser } = useCurrentUser();
  const navigation = useNavigation<NativeStackNavigationProp<FormRouteParams>>();

  return (values: TransferData) => {
    const isNormalTransfer = transferRouteName === PaymentsRoutes.NewTransfer;
    let postValues: TransferModel | CyclicalTransferModel;
    let endpoint: string;
    let successMessage: string;
    let operationAfterSuccess: () => void;

    if (isNormalTransfer) {
      postValues = {
        ...values,
        transferDate: moment().toISOString(),
        type: TransferType.Outgoing,
        client: currentUser || {} as ClientModel
      };

      endpoint = '/transfers';
      successMessage = '👍 Zrealizowano przelew';

      operationAfterSuccess = fetchUser;
    } else {
      postValues = {
        ...values,
        reTransferDate: moment(values.transferDate || new Date()).toISOString(),
        receiver: values.receiver_sender,
        accountNumber: values.toAccountNumber,
        client: currentUser || {} as ClientModel
      };

      endpoint = '/cyclical-transfers';
      successMessage = '👍 Zrealizowano przelew cykliczny';

      operationAfterSuccess = () => {
        navigation.pop();
        navigation.navigate(PaymentsRoutes.CyclicalTransfers as never);
      }
    }

    return { postValues, endpoint, successMessage, operationAfterSuccess };
  };
};
