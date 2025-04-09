import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { User } from '../../models/user.model';
import { TrainingSessionService } from './training-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _baseUrl = environment.apiUrl;
  private _userId: string | undefined;
  isAdmin: boolean = false;

  constructor(
    private _http: HttpClient,
    private _trainingService: TrainingSessionService,
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem("userId");
    console.log("🚀 ~ AuthenticationService ~ ngOnInit ~ userId:", userId);
    const isAdmin = localStorage.getItem("isAdmin");
    console.log("🚀 ~ AuthenticationService ~ ngOnInit ~ isAdmin:", isAdmin);

    if (userId) {
      this._userId = userId;
      this._trainingService.setUserId(userId);
    }

    if (isAdmin) {
      this.isAdmin = isAdmin === "true";
    }
  }

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
    this._userId = id;
    this.isAdmin = admin;

    localStorage.setItem("userId", id);
    localStorage.setItem("isAdmin", admin ? "true" : "false");
  }

  getUserId() {
    if (!this._userId || this._userId === "") {
      const userId = localStorage.getItem("userId");
      const isAdmin = localStorage.getItem("isAdmin");

      if (userId) {
        this._userId = userId;
        this._trainingService.setUserId(userId);
      }

      if (isAdmin) {
        this.isAdmin = isAdmin === "true";
      }
    }

    return this._userId;
  }

  logout() {
    this._userId = undefined;
    this.isAdmin = false;
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  }
}
