import { Inject, Injectable, InjectionToken } from '@angular/core';
import { RawProduct } from '../../common/interfaces/product.interface';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) { }

  /**
   * Returns the favourites from the storage.
   *
   * @param {string} username
   * @return {*}  {RawProduct[]}
   * @memberof FavouritesService
   */
  getFavourites(username: string): RawProduct[] {
    const favouritesStr = this.storage.getItem(username);
    if (favouritesStr) {
      return JSON.parse(favouritesStr);
    } else {
      return [];
    }
  }

  /**
   * Adds a product to the favourites.
   *
   * @param {string} username
   * @param {*} product
   * @return {*}  {RawProduct[]}
   * @memberof FavouritesService
   */
  addFavourite(username: string, product: any): RawProduct[] {
    const favourites = this.getFavourites(username);
    if (favourites) {
      favourites.push(product);
      this.storage.setItem(username, JSON.stringify(favourites));
      return favourites;
    } else {
      this.storage.setItem(username, JSON.stringify([product]));
      return [product];
    }
  }

  /**
   * Removes a favourite from the storage.
   *
   * @param {string} username
   * @param {*} product
   * @return {*}  {RawProduct[]}
   * @memberof FavouritesService
   */
  removeFavourite(username: string, product: any): RawProduct[] {
    const favourites = this.getFavourites(username);
    if (favourites) {
      const index = favourites.findIndex((fav: RawProduct) => fav.id === product.id);
      favourites.splice(index, 1);
      this.storage.setItem(username, JSON.stringify(favourites));
      return favourites;
    } else {
      return [];
    }
  }

  /**
   * Removes all favourites from the storage.
   *
   * @param {string} username
   * @memberof FavouritesService
   */
  cleanFavourites(username: string): void {
    this.storage.removeItem(username);
  }
}
