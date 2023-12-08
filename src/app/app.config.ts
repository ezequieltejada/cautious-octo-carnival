import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppEffects } from './state/app/app.effects';
import { provideHttpClient } from '@angular/common/http';
import { appFeature } from './state/app/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({
    [appFeature.name]: appFeature.reducer
  }), provideEffects(AppEffects), provideStoreDevtools({
    maxAge: 25,
    logOnly: isDevMode()
  }), provideHttpClient()]
};
