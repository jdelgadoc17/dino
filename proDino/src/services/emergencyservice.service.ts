import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  private apiUrl = 'http://localhost:3000/emergencies';

  constructor(private http: HttpClient) {}

  getEmergency(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
