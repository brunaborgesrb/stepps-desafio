import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://127.0.0.1:8000/api/dashboard/indicators/';

  constructor(private http: HttpClient) {}


  getIndicators(): Observable<any[]> {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const token = user.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ` + token, 
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
