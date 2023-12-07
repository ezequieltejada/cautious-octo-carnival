import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../common/interfaces/user.interface';
import { PagedProductsResponse, RawProduct } from '../../common/interfaces/product.interface';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Load Apps': emptyProps(),
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Fetch Products': props<{ limit: number, skip: number }>(),
    'Fetch Products Success': props<{ products: PagedProductsResponse }>(),
    'Fetch Products Failure': props<{ error: string }>(),
    'Fetch Favorites': props<{ user: User }>(),
    'Fetch Favorites Success': props<{ favourites: RawProduct[] }>(),
    'Fetch Favorites Failure': props<{ error: string }>(),
    'Add to Favorites': props<{ product: RawProduct, user: User }>(),
    'Add to Favorites Success': props<{ favourites: RawProduct[] }>(),
    'Add to Favorites Failure': props<{ error: string }>(),
    'Remove from Favorites': props<{ product: RawProduct, user: User }>(),
    'Remove from Favorites Success': props<{ favourites: RawProduct[] }>(),
    'Remove from Favorites Failure': props<{ error: string }>(),
  }
});
