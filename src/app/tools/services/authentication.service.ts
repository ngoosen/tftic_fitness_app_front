import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _baseUrl = environment.apiUrl;
  userId: string | undefined;
  isAdmin: boolean = false;

  constructor(private _http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<User> {
    return this._http.post<User>(`${this._baseUrl}/user/register`, {
      username,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<User> {
    return this._http.post<User>(`${this._baseUrl}/user/login`, {
      email,
      password,
    });
  }

  setUserId(id: string, admin: boolean) {
    this.userId = id;
    this.isAdmin = admin;
  }
}
