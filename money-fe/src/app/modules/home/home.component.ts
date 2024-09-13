import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TransfersComponent } from './transfers/transfers.component';
import { RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { WebsocketService } from '../../services/websockets/websocket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    NavBarComponent,
    TransfersComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private $destroy: Subject<boolean> = new Subject();
  constructor(
    private userService: UserService,
    private websocketService: WebsocketService,
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCookieUser();
    if (!user) this.getUser();
    else this.subscribeToGetMessageEvent(user.id);
  }

  getUser() {
    this.userService
      .getUser()
      .pipe(
        takeUntil(this.$destroy),
        tap((res) => this.subscribeToGetMessageEvent(res.id)),
      )
      .subscribe();
  }

  subscribeToGetMessageEvent(userid: string) {
    this.websocketService.subscribeToGetMessageEvent(userid);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
