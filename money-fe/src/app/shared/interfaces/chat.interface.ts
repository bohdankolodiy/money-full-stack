export interface IChatResponse {
  chat_id: string;
  user1_id: string;
  user2_id: string;
  wallet_1: string;
  wallet_2: string;
  last_message_id: string;
  last_message: IMessage;
}

export interface IChatMessages {
  chat_messages: IMessagesResponce[];
  last_page: number;
}

export interface IMessagesResponce {
  date: string;
  messages: IMessage[];
}

export interface IChatBody {
  user_reciever_id: string;
}

export interface IMessage {
  message_id: string;
  text: string;
  send_date: string;
  chat_id: string;
  sender_id: string;
}
