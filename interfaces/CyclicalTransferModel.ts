import { ClientModel } from "./ClientModel";

export interface CyclicalTransferModel {
  transferId?: number;
  amount: number;
  reTransferDate: string;
  category: string;
  receiver: string;
  accountNumber: string;
  title: string;
  client: ClientModel;
}