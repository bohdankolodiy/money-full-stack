import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from '../../shared/interfaces/chat.interface';

interface INewMessageEvent {
  event: string;
  chat_id: string;
  message: IMessage;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  getMessage: Subject<INewMessageEvent> = new Subject();
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:3000/ws');
  }

  subscribeToGetMessageEvent(userId: string) {
    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ meta: 'join', clientId: userId }));
    });

    this.socket.addEventListener('message', (event) => {
      const transformEvent: INewMessageEvent = JSON.parse(event.data);

      if (transformEvent.event === 'get_message')
        this.getMessage.next(transformEvent);
    });
  }
}
