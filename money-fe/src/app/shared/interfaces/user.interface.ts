export interface IUser {
  id: string;
  email: string;
  wallet_id: string;
  is_verify: boolean;
}

export interface IUsersForChat {
  id: string;
  wallet: string;
}