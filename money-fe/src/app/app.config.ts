import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptors/auth-interceptor.service';
import { provideToastr } from 'ngx-toastr';
import { ErrorCatchingInterceptor } from './services/interceptors/error-catching-interceptor.service';
// import { Socket,  } from 'socket.io-client';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: '', // socket server url;
  options: {},
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([AuthInterceptor, ErrorCatchingInterceptor]),
    ),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar: true,
      newestOnTop: true,
      closeButton: true,
    }),
    importProvidersFrom(SocketIoModule.forRoot(config)),
  ],
};
