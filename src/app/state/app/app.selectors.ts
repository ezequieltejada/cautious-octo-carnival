import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectUser = createSelector(
  selectAppState,
  (state) => state.user
);

export const selectProducts = createSelector(
  selectAppState,
  (state) => state.products
);

export const selectFavourites = createSelector(
  selectAppState,
  (state) => state.favourites
);