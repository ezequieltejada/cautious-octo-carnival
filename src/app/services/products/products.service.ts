import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeletedProduct, Product } from '../../common/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly host = 'https://dummyjson.com/products';

  /**
   * Fetches products from the API endpoint https://dummyjson.com/products
   *
   * @param {number} [limit=10]
   * @param {number} [skip=0]
   * @return {*} 
   * @memberof ProductsService
   */
  fetchProducts(limit = 10, skip = 0) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pick<Product, 'title' | 'description' | 'thumbnail' | 'price' | 'id'>[]>(`${this.host}?limit=${limit}&skip=${skip}?select=title,description,thumbnail,price,id`, { headers });
  }

  /**
   * Creates a new product.
   *
   * @param {Product} product
   * @return {*} 
   * @memberof ProductsService
   */
  addProduct(product: Product) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Product>(`${this.host}/add`, product, { headers });
  }

  /**
   * Updates an existing product.
   *
   * @param {Product} product
   * @return {*} 
   * @memberof ProductsService
   */
  updateProduct(product: Product) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Product>(`${this.host}/update/${product.id}`, product, { headers });
  }

  /**
   * Deletes an existing product.
   *
   * @param {string} id
   * @return {*} 
   * @memberof ProductsService
   */
  deleteProduct(product: Product) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<DeletedProduct>(`${this.host}/delete/${product.id}`, { headers });
  }
}
