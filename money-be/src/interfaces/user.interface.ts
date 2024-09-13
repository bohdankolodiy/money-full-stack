import { ITransactHistory } from "./history.interface";

export interface IUser {
  id: string;
  email: string;
  password: string;
  wallet: string;
  balance: number;
  is_verify: boolean;
}

export interface IInfo {
  id: string;
  amount: number;
  history: ITransactHistory;
}