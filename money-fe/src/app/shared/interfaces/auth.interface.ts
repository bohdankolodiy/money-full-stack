export interface IAuthBody {
  email: string;
  password: string;
}

export interface IAuthSuccesRespons {
  message: string;
}

export interface IAuthToken {
  accessToken: string;
}
