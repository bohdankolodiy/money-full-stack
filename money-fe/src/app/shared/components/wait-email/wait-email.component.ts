import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-wait-email',
  standalone: true,
  imports: [],
  templateUrl: './wait-email.component.html',
  styleUrl: './wait-email.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitEmailComponent {
  title = input.required<string>();
  message = computed(() =>
    this.title() === 'resetPassword'
      ? 'Resetting password'
      : 'Approving registration'
  );
}
