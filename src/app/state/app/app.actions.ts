import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../common/interfaces/user.interface';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Load Apps': emptyProps(),
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps()
  }
});
