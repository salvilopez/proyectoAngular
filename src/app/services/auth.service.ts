import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user/user.model';

// We import HTTP Client to perform HTTP Requests
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  /**
   * usuario para el login
   * @param user Usuario para el login
   * @returns observable el usuario con el token del login
   */
  login(user: User): Observable<any> {
    let body = {
      email: user.email,
      password: user.password,
    };
    //body.email = 'eve.holt@reqres.in';
    //body.password = 'cityslicka';
    return this.http.post('https://reqres.in/api/login', body);
  }

  /**
   * Metodo getter de log
   */
  get loggedIn() {
    return this.isLoggedIn;
  }

  /**
   * Metodo setter de log
   */
  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  /**
   * Metodo register del usuario
   * @param user usuario de registro
   * @returns devuelve el usuario con el token de registro
   */
  register(user: User): Observable<any> {
    let body = {
      email: user.email,
      password: user.password,
    };
    console.table(body);
    //body.email = 'eve.holt@reqres.in';
    //body.password = 'pistol';
    return this.http.post('https://reqres.in/api/register', body);
  }
}
