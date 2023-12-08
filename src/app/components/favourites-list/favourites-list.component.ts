import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFavourites, selectProducts, selectUser } from '../../state/app/app.selectors';
import { OperatorFunction, combineLatest, filter, map, of, switchMap, take, tap } from 'rxjs';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PagedProductsResponse, Product } from '../../common/interfaces/product.interface';
import { User } from '../../common/interfaces/user.interface';
import { AppActions } from '../../state/app/app.actions';

@Component({
  selector: 'app-favourites-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProductItemComponent, NgOptimizedImage],
  template: `
    @if (productsPage$ | async; as productsPage) {
      <h1>Favourites</h1>
      <ul>
        @for (product of productsPage.products; track product.id; let first = $first) {
          <app-product-item>
            <img [src]="product.thumbnail" [alt]="product.title" />
            <h3>
              {{ product.title }} 
              @if (product.isFavourite) {
                <span class="heart" (click)="removeFromFavourite(product, productsPage.user)">♥</span>
              } @else {
                <span class="heart" (click)="addToFavourite(product, productsPage.user)">♡</span>
              }
            </h3>
            <p>{{ product.description }}</p>
            <span>{{ product.price | currency:'EUR' }}</span>
          </app-product-item>
        }
      </ul>
      <!-- <p>Page {{ productsPage.products.limit }} of {{ productsPage.products.total }}</p> -->
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;

      & ul {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        list-style: none;
      }

      & .heart {
        cursor: pointer;
        font-size: 2rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesListComponent {

  store = inject(Store);
  user$ = this.store.select(selectUser).pipe(
    filter((user) => !!user) as OperatorFunction<User | null, User>,
    tap((user) => {
      this.store.dispatch(AppActions.fetchFavorites({ user }));
    }),
  );
  products$ = this.store.select(selectProducts).pipe(
    filter((productsPage) => !!productsPage) as OperatorFunction<PagedProductsResponse | null, PagedProductsResponse>,
  );

  favourites$ = this.store.select(selectFavourites);

  productsPage$ = combineLatest([this.user$, this.favourites$]).pipe(
    map(([user, products]) => ({
        user,
        products
    })),
    take(1),
    switchMap(({user, products}) => combineLatest([of(user), of(products), this.favourites$])),
    map(([user, products, favourites]) => {
      const productsWithFavourites = products.map((product) => ({
        ...product,
        isFavourite: favourites.some((favourite) => favourite.id === product.id)
      } as Product));
      return {
        user,
        products: productsWithFavourites
      };
    })
  );

  addToFavourite(product: Product, user: User) {
    this.store.dispatch(AppActions.addToFavorites({ product, user }));
  }
  
  removeFromFavourite(product: Product, user: User) {
    this.store.dispatch(AppActions.removeFromFavorites({ product, user }));
  }
}
