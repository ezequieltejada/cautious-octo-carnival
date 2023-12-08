import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { Observable, EMPTY, of, throwError } from 'rxjs';
import { AppActions } from './app.actions';
import { LoginService } from '../../services/login/login.service';
import { ProductsService } from '../../services/products/products.service';
import { FavouritesService } from '../../services/favourites/favourites.service';


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
      switchMap(({username, password}) => this.loginService.login(username, password)),
      map((user) => AppActions.loginSuccess({ user })),
      catchError((error) => of(AppActions.loginFailure({ error })))
    );
  });

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.fetchProducts),
      switchMap(({ limit, skip }) => this.productsService.fetchProducts(limit, skip)),
      map((products) => AppActions.fetchProductsSuccess({ products })),
      catchError((error) => of(AppActions.fetchProductsFailure({ error }))),
    );
  });

  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.fetchFavorites),
      map(({user}) => this.favouritesService.getFavourites(user.username)),
      map((content) => AppActions.fetchFavoritesSuccess({ favourites: content })),
      catchError((error) => of(AppActions.fetchFavoritesFailure({ error }))),
    );
  });

  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.addToFavorites),
      map(({product, user}) => this.favouritesService.addFavourite(user.username, product)),
      map((content) => AppActions.addToFavoritesSuccess({ favourites: content })),
      catchError((error) => of(AppActions.addToFavoritesFailure({ error }))),
    );
  });

  removeFromFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.removeFromFavorites),
      map(({ product, user }) => {
        try {
          const updatedFavourites = this.favouritesService.removeFavourite(user.username, product);
          return AppActions.removeFromFavoritesSuccess({ favourites: updatedFavourites });
        } catch (error) {
          let message = 'An error occurred while removing the product from the favourites.';
          if (error instanceof Error) {
            message = error.message;
          } else if (typeof error === 'object') {
            message = JSON.stringify(error);
          }
          return AppActions.removeFromFavoritesFailure({ error: message });
        }
      })
    );
  });

  nextProductPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.nextProductPage),
      map(({products}) => {
        const newSkip = products.skip + products.limit;
        if (newSkip >= products.total) {
          return AppActions.fetchProducts({ limit: 10, skip: 0 });
        }
        return AppActions.fetchProducts({ limit: 10, skip: newSkip });
      }),
    );
  });

  previousProductPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.previousProductPage),
      map(({ products }) => {
        const newSkip = products.skip - products.limit;
        if (newSkip < 0) {
          return AppActions.fetchProducts({ limit: 10, skip: products.total - products.limit });
        }
        return AppActions.fetchProducts({ limit: 10, skip: newSkip });
      }),
    );
  });



  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private productsService: ProductsService,
    private favouritesService: FavouritesService
  ) {}
}
