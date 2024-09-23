import {
  Component,
  DestroyRef,
  effect,
  HostListener,
  signal,
} from '@angular/core';
import { WalletPipe } from '../../../shared/pipes/wallet.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewChatModalComponent } from '../../../shared/components/modals/new-chat-modal/new-chat-modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { ChatService } from '../../../services/chat/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, switchMap, tap } from 'rxjs';
import {
  IChatBody,
  IChatResponse,
  IMessages,
  IMessagesResponce,
} from '../../../shared/interfaces/chat.interface';
import { UserService } from '../../../services/user/user.service';
import { WebsocketService } from '../../../services/websockets/websocket.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from '../../../services/confirmation/confirmation.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    WalletPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  search: FormControl<string | null> = new FormControl(null);
  text: FormControl<string | null> = new FormControl(null);

  selectedChat = signal<IChatResponse | null>(null);
  chats: IChatResponse[] = [];
  messages: IMessagesResponce[] = [];

  constructor(
    private dialog: MatDialog,
    private chatService: ChatService,
    private userService: UserService,
    private df: DestroyRef,
    private webSocketService: WebsocketService,
    private confirmationService: ConfirmationService,
  ) {
    effect(
      () => {
        if (this.selectedChat()) {
          this.getMessages().subscribe((res) => (this.messages = res));
        } else {
          this.messages = [];
        }
      },
      { allowSignalWrites: true },
    );
  }
  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler() {
    this.onSend();
  }

  ngOnInit(): void {
    this.getChats();
    this.subscribeToNewMassage();
  }

  subscribeToNewMassage() {
    this.webSocketService.getMessage
      .pipe(
        takeUntilDestroyed(this.df),
        filter((data) => !!data),
        tap((res) => this.setLastMessage(res.chat_id, res.message)),
        filter(() => !!this.selectedChat()?.chat_id),
      )
      .subscribe((res) =>
        this.messages[this.messages.length - 1].messages.push(res.message),
      );
  }

  getMessages(): Observable<IMessagesResponce[]> {
    return this.chatService.getChatMessage(this.selectedChat()!.chat_id);
  }

  getChats() {
    this.chatService
      .getUserChats()
      .pipe(takeUntilDestroyed(this.df))
      .subscribe((res) => (this.chats = res));
  }

  openNewChatModal() {
    this.dialog
      .open(NewChatModalComponent, {
        width: 'initial',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'New Chat',
          chats: this.chats ?? [],
        },
      })
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.df),
        filter((res) => !!res),
        switchMap((res: IChatBody) => this.chatService.createChat(res)),
        tap((res) => this.selectedChat.set(res)),
      )
      .subscribe(() => this.getChats());
  }

  getChatTitle(chat: IChatResponse): string {
    return chat.user1_id === this.userService.getCookieUser().id
      ? chat.wallet_2
      : chat.wallet_1;
  }

  isSender(message: IMessages): boolean {
    return message.sender_id === this.userService.getCookieUser().id;
  }

  onSelectChat(chat: IChatResponse) {
    this.selectedChat.set(chat);
  }

  onSend() {
    if (!this.text.value) return;
    const body = {
      chat_id: this.selectedChat()!.chat_id,
      text: this.text.value?.toString().trim(),
      sender_id: this.userService.getCookieUser().id,
      reciever_id:
        this.selectedChat()!.user1_id === this.userService.getCookieUser().id
          ? this.selectedChat()!.user2_id
          : this.selectedChat()!.user1_id,
    };

    this.text.reset();

    this.chatService
      .addMessage(body)
      .pipe(
        takeUntilDestroyed(this.df),
        tap((res) => this.setLastMessage(this.selectedChat()!.chat_id, res)),
        switchMap(() => this.getMessages()),
      )
      .subscribe((res) => (this.messages = res));
  }

  deleteChat() {
    this.confirmationService
      .opneConfirmModal('Deletion', 'Are you sure you want to delete chat?')
      .pipe(
        takeUntilDestroyed(this.df),
        switchMap(() =>
          this.chatService.deleteChat(this.selectedChat()!.chat_id),
        ),
      )
      .subscribe(() => {
        this.selectedChat.set(null);
        this.getChats();
      });
  }

  setLastMessage(chat_id: string, message: IMessages) {
    const currentChat = this.chats.find((el) => chat_id === el.chat_id);
    if (currentChat && message) currentChat.last_message = message;
  }

  isToday(date: string): boolean {
    return (
      new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
    );
  }

  getTime(date: string): string {
    const minutes: number = new Date(date).getMinutes();
    return `${new Date(date).getHours()}:${String(minutes).padStart(2, '0')}`;
  }
}
