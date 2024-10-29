import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnclosureService {
  private apiUrl = 'http://localhost:3000/enclosures'; 

  constructor(private http: HttpClient) {}

  getEnclosures(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
