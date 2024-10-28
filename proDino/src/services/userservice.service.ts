import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginObservableSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('https://67174bf1b910c6a6e02761c0.mockapi.io/user');
  }

  loginUser(email: string, password: string, onLogin: (success: boolean, user?: any) => void){
    let token :any;
    token = this.http.post('https://localhost:3000/auth/login', {"email": email, "password": password}).subscribe((users: any) => {
        const user = users.find((user: any) => user.email === email && user.password === password)
        onLogin(true, user)
    })
    return token
  }

  registerUser(email: string, password: string, onRegister: (success: boolean) => void){
    this.http.post('https://localhost:3000/auth/register', {"email": email, "password": password}).subscribe(() => {
        onRegister(true)
    })
  } 
}