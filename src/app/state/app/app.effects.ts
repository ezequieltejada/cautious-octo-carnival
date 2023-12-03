import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AppActions } from './app.actions';
import { LoginService } from '../../services/login/login.service';

@Injectable()
export class AppEffects {


  loadApps$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AppActions.loadApps),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      switchMap(({username, password}) => this.login.login(username, password)),
      map((user) => AppActions.loginSuccess({ user })),
      catchError((error) => of(AppActions.loginFailure({ error })))
    );
  });

  constructor(private actions$: Actions, private login: LoginService) {}
}
