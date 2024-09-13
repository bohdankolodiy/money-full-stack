import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IChatBody,
  IChatResponse,
  IMessages,
  IMessagesResponce,
} from '../../shared/interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #pathUrl: string = '/api/v1/';
  constructor(private http: HttpClient) {}

  getUserChats(): Observable<IChatResponse[]> {
    return this.http.get<IChatResponse[]>(`${this.#pathUrl}chat`);
  }

  createChat(body: IChatBody): Observable<IChatResponse> {
    return this.http.post<IChatResponse>(`${this.#pathUrl}chat/create`, body);
  }

  getChatMessage(id: string): Observable<IMessagesResponce[]> {
    return this.http.get<IMessagesResponce[]>(
      `${this.#pathUrl}chat/message/${id}`,
    );
  }

  addMessage(body: Partial<IMessages>): Observable<IMessages> {
    return this.http.post<IMessages>(`${this.#pathUrl}chat/message/add`, body);
  }

  deleteChat(chat_id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.#pathUrl}chat/${chat_id}`);
  }
}
