import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Product, RawProduct } from '../../common/interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

// export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
//   providedIn: 'root',
//   factory: () => localStorage
// });

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  // constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }
  private _favourites: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  /**
   * Returns the favourites from the storage.
   *
   * @param {string} username
   * @return {*}  {Product[]}
   * @memberof FavouritesService
   */
  getFavourites(username: string): Product[] {
    // const favouritesStr = this.storage.getItem(username);
    // if (favouritesStr) {
    //   return JSON.parse(favouritesStr);
    // } else {
    //   return [];
    // }
    return this._favourites.getValue();
  }

  /**
   * Adds a product to the favourites.
   *
   * @param {string} username
   * @param {*} product
   * @return {*}  {Product[]}
   * @memberof FavouritesService
   */
  addFavourite(username: string, product: any): Product[] {
    const favourites = this.getFavourites(username);
    // if (favourites) {
    //   favourites.push(product);
    //   this.storage.setItem(username, JSON.stringify(favourites));
    //   return favourites;
    // } else {
    //   this.storage.setItem(username, JSON.stringify([product]));
    //   return [product];
    // }
    this._favourites.next([...favourites, product]);
    return this.getFavourites(username);
  }

  /**
   * Removes a favourite from the storage.
   *
   * @param {string} username
   * @param {*} product
   * @return {*}  {Product[]}
   * @memberof FavouritesService
   */
  removeFavourite(username: string, product: Product): Product[] {
    const favourites = this.getFavourites(username);
    const updatedFavourites = favourites.filter(fav => fav.id !== product.id);
    this._favourites.next(updatedFavourites);
    return updatedFavourites;
  }

  /**
   * Removes all favourites from the storage.
   *
   * @param {string} username
   * @memberof FavouritesService
   */
  cleanFavourites(username: string): void {
    this._favourites.next([]);
  }
}
