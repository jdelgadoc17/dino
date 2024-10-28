import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostsFromUser(userId: number): Observable<any> {
    return this.http.get(`https://67174bf1b910c6a6e02761c0.mockapi.io/user/${userId}/post`);
  }
}