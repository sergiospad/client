import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import {authInterceptorProviders, routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    authInterceptorProviders,
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};

