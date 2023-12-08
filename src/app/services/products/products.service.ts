import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeletedProduct, PagedProductsResponse, RawProduct } from '../../common/interfaces/product.interface';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly host = 'https://dummyjson.com/products';

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * Fetches products from the API endpoint https://dummyjson.com/products
   *
   * @param {number} [limit=10]
   * @param {number} [skip=0]
   * @return {*} 
   * @memberof ProductsService
   */
  fetchProducts(limit = 10, skip = 0) {
    return this.http.get<PagedProductsResponse>(`${this.host}?limit=${limit}&skip=${skip}`, { headers: this.headers });
  }

  /**
   * Creates a new product.
   *
   * @param {RawProduct} product
   * @return {*} 
   * @memberof ProductsService
   */
  addProduct(product: RawProduct) {
    return this.http.post<RawProduct>(`${this.host}/add`, product, { headers: this.headers });
  }

  /**
   * Updates an existing product.
   *
   * @param {RawProduct} product
   * @return {*} 
   * @memberof ProductsService
   */
  updateProduct(product: RawProduct) {
    return this.http.put<RawProduct>(`${this.host}/update/${product.id}`, product, { headers: this.headers });
  }

  /**
   * Deletes an existing product.
   *
   * @param {string} id
   * @return {*} 
   * @memberof ProductsService
   */
  deleteProduct(product: RawProduct) {
    return this.http.delete<DeletedProduct>(`${this.host}/delete/${product.id}`, { headers: this.headers });
  }
}
