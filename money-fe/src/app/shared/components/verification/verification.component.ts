import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.queryParams['id'];
    if (id) this.vefiry(id);
    else this.authService.loginRedirect(['/login']);
  }

  vefiry(id: string) {
    this.authService.verifyUser(id).subscribe();
  }
}
