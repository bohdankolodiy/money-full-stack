import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../shared/components/modals/confirmation-modal/confirmation-modal.component';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  _dialog = inject(MatDialog);

  opneConfirmModal(title: string, text: string): Observable<string> {
    return this._dialog
      .open(ConfirmationModalComponent, {
        width: '250px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title,
          text,
        },
      })
      .afterClosed()
      .pipe(filter((res) => res));
  }
}
