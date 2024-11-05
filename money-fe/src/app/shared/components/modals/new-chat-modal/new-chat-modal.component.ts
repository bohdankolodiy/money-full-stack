import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../../services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from '../../../interfaces/user.interface';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { WalletPipe } from '../../../pipes/wallet.pipe';
import { IChatBody, IChatResponse } from '../../../interfaces/chat.interface';

interface IModal {
  title: string;
  chats: IChatResponse[];
}

@Component({
  selector: 'app-new-chat-modal',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatButtonModule,
    WalletPipe,
  ],
  templateUrl: './new-chat-modal.component.html',
  styleUrl: './new-chat-modal.component.scss',
})
export class NewChatModalComponent implements OnInit {
  search: FormControl<string | null> = new FormControl(null);
  users: IUser[] = [];

  get title(): string {
    return this.data.title ?? '';
  }
  constructor(
    @Inject(DIALOG_DATA) public data: IModal,
    private userService: UserService,
    private destroyRef: DestroyRef,
    private dialog: MatDialogRef<NewChatModalComponent>,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.users = res.filter(
          (item: IUser) =>
            !this.data.chats.some(
              (el: IChatResponse) =>
                el.user1_id === item.id || el.user2_id === item.id,
            ),
        );
      });
  }

  onClose() {
    this.dialog.close();
  }

  onCreate(item: IUser) {
    this.dialog.close({
      user2_id: item.id,
      wallet_2: item.wallet_id,
    } as IChatBody);
  }
}
