import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../common/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * Login
   *
   * @param {string} username
   * @param {string} password
   * @return {*} 
   * @memberof LoginService
   */
  login(username: string, password: string) {
    return this.http.post<User>('https://dummyjson.com/auth/login', {
      username,
      password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  
}
