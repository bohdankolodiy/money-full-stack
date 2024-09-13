import { ITransfer } from './transfers.interface';

export interface ITransacts {
  items: ITransfer[];
  amount: number;
  date: string;
}

export interface ITransactsBody {
  amount: number;
  wallet: string;
}

export interface ITransactsResponse {
  balance: number;
}
