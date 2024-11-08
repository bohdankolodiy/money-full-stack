import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IChatBody,
  IChatMessages,
  IChatResponse,
  IMessage,
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

  getChatMessage(id: string, page: number = 0): Observable<IChatMessages> {
    return this.http.get<IChatMessages>(
      `${this.#pathUrl}chat/message/${id}?page=${page}`,
    );
  }

  addMessage(body: Partial<IMessage>): Observable<IMessage> {
    return this.http.post<IMessage>(`${this.#pathUrl}chat/message/add`, body);
  }

  deleteChat(chat_id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${this.#pathUrl}chat/${chat_id}`);
  }
}
