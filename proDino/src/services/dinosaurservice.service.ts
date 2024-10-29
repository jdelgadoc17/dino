import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinosaurService {
  private apiUrl = 'http://localhost:3000/dinosaurs'; 

  constructor(private http: HttpClient) {}

  getDinosaurs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
