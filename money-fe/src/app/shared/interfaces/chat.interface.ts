export interface IChatResponse {
  chat_id: string;
  user1_id: string;
  user2_id: string;
  wallet_1: string;
  wallet_2: string;
  last_message_id: string;
  last_message: IMessages;
}

export interface IMessagesResponce {
  date: string;
  messages: IMessages[];
}

export interface IChatBody {
  user2_id: string;
  wallet_2: string;
}

export interface IMessages {
  message_id: string;
  text: string;
  send_date: string;
  chat_id: string;
  sender_id: string;
}
