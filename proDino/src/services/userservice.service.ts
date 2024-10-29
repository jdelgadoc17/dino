import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginObservableSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/login`, { email, password });
  }

  registerUser(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/auth/register`, { email, password });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginObservableSubject.asObservable();
  }
}
