import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFavourites, selectProducts, selectUser } from '../../state/app/app.selectors';
import { OperatorFunction, combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { ProductItemComponent } from '../product-item/product-item.component';
import { PagedProductsResponse, Product } from '../../common/interfaces/product.interface';
import { User } from '../../common/interfaces/user.interface';
import { AppActions } from '../../state/app/app.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ProductItemComponent, NgOptimizedImage],
  template: `
    @if (productsPage$ | async; as productsPage) {
      <h1>Products</h1>
      <ul>
        @for (product of productsPage.products.products; track product.id; let first = $first) {
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
      <p>
        <a href="#" (click)="prevPage(productsPage.products)"><</a>
        Page {{ productsPage.products.limit + productsPage.products.skip }} of {{ productsPage.products.total }}
        <a href="#" (click)="nextPage(productsPage.products)">></a>
      </p>
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
export class ProductListComponent {


  store = inject(Store);
  user$ = this.store.select(selectUser).pipe(
    filter((user) => !!user) as OperatorFunction<User | null, User>,
    tap((user) => {
      this.store.dispatch(AppActions.fetchFavorites({ user }));
      this.store.dispatch(AppActions.fetchProducts({ limit: 10, skip: 0 }));
    }),
  );
  products$ = this.store.select(selectProducts).pipe(
    filter((productsPage) => !!productsPage) as OperatorFunction<PagedProductsResponse | null, PagedProductsResponse>,
  );

  favourites$ = this.store.select(selectFavourites);

  productsWithFavourites$ = this.user$.pipe(
    switchMap(() => combineLatest([this.favourites$, this.products$])),
    map(([favourites, products]) => {
      const productsWithFavourites = products.products.map((product) => ({
        ...product,
        isFavourite: favourites.some((favourite) => favourite.id === product.id)
      } as Product));
      return {
        ...products,
        products: productsWithFavourites
      };
    })
  );
   
  
  productsPage$ = combineLatest([this.user$, this.productsWithFavourites$]).pipe(
    map(([user, products]) => ({
        user,
        products
    }))
  );

  addToFavourite(product: Product, user: User) {
    this.store.dispatch(AppActions.addToFavorites({ product, user }));
  }
  
  removeFromFavourite(product: Product, user: User) {
    this.store.dispatch(AppActions.removeFromFavorites({ product, user }));
  }

  nextPage(productsPage: PagedProductsResponse) {
    this.store.dispatch(AppActions.nextProductPage({products: productsPage}));
  }

  prevPage(productsPage: PagedProductsResponse) {
    this.store.dispatch(AppActions.previousProductPage({ products: productsPage }));
  }
}
