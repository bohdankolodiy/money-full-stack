import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LoaderService } from '../loader/loader.service';
import { ToastrService } from 'ngx-toastr';

export const ErrorCatchingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next,
) => {
  const notifier = inject(ToastrService);
  const spinner = inject(LoaderService);
  spinner.setLoading(true);

  return next(req).pipe(
    tap<HttpEvent<unknown>>((evt: HttpEvent<unknown>) => {
      if (req.url.includes('/api/')) {
        if (evt instanceof HttpResponse) {
          spinner.setLoading(false);
        }
      }
      return evt;
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMsg = error?.error?.message ?? error.message;
      spinner.setLoading(false);
      notifier.error(errorMsg);
      return throwError(() => error);
    }),
  );
};
