import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { User } from '../../common/interfaces/user.interface';

export const appFeatureKey = 'app';

export interface State {
  user: User | null;
  error: string | null;
  loginStatus: 'idle' | 'loading' | 'success' | 'failure';
}

export const initialState: State = {
  user: null,
  error: null,
  loginStatus: 'idle'
};

export const reducer = createReducer(
  initialState,
  on(AppActions.loadApps, state => state),
  on(AppActions.login, state => ({ ...state, loginStatus: 'loading' as const })),
  on(AppActions.loginSuccess, (state, { user }) => ({ ...state, user, loginStatus: 'success' as const })),
  on(AppActions.loginFailure, (state, { error }) => ({ ...state, error, loginStatus: 'failure' as const })),
  on(AppActions.logout, state => initialState)
);

export const appFeature = createFeature({
  name: appFeatureKey,
  reducer,
});

