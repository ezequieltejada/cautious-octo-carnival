import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { User } from '../../common/interfaces/user.interface';
import { PagedProductsResponse, RawProduct } from '../../common/interfaces/product.interface';

export const appFeatureKey = 'app';

export interface State {
  user: User | null;
  error: string | null;
  loginStatus: 'idle' | 'loading' | 'success' | 'failure';
  loadingProductsStatus: 'idle' | 'loading' | 'success' | 'failure';
  products: PagedProductsResponse | null;
  favourites: RawProduct[];
}

export const initialState: State = {
  user: null,
  error: null,
  loginStatus: 'idle',
  loadingProductsStatus: 'idle',
  products: null,
  favourites: [],
};

export const reducer = createReducer(
  initialState,
  on(AppActions.loadApps, state => state),
  on(AppActions.login, state => ({ ...state, loginStatus: 'loading' as const })),
  on(AppActions.loginSuccess, (state, { user }) => ({ ...state, user, loginStatus: 'success' as const })),
  on(AppActions.loginFailure, (state, { error }) => ({ ...state, error, loginStatus: 'failure' as const })),
  on(AppActions.logout, state => initialState),
  on(AppActions.fetchProducts, state => ({ ...state, loadingProductsStatus: 'loading' as const })),
  on(AppActions.fetchProductsSuccess, (state, { products }) => ({ ...state, products, loadingProductsStatus: 'success' as const })),
  on(AppActions.fetchProductsFailure, (state, { error }) => ({ ...state, error, loadingProductsStatus: 'failure' as const })),
  on(AppActions.fetchFavorites, state => state),
  on(AppActions.fetchFavoritesSuccess, (state, { favourites }) => ({ ...state, favourites })),
  on(AppActions.fetchFavoritesFailure, (state, { error }) => ({ ...state, error })),
  on(AppActions.addToFavorites, state => state),
  on(AppActions.addToFavoritesSuccess, (state, { favourites }) => ({ ...state, favourites })),
  on(AppActions.addToFavoritesFailure, (state, { error }) => ({ ...state, error })),
  on(AppActions.removeFromFavorites, state => state),
  on(AppActions.removeFromFavoritesSuccess, (state, { favourites }) => ({ ...state, favourites })),
  on(AppActions.removeFromFavoritesFailure, (state, { error }) => ({ ...state, error })),
);

export const appFeature = createFeature({
  name: appFeatureKey,
  reducer,
});

