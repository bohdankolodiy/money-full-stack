import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next,
) => {
  const auth = inject(AuthService);

  const authReq = addTokenToRequest(req, auth.getAccessToken());
  return next(authReq);
};

function addTokenToRequest(
  request: HttpRequest<unknown>,
  token: string,
): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
}
