import { Injectable } from '@angular/core';
import { loginI } from 'src/app/models/login.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://127.0.0.1:8000/api/auth/login';
  private apiLogout: string = 'http://127.0.0.1:8000/api/auth/logout';
  private apiSearchCC: string = 'http://127.0.0.1:8000/api/auth/searchPhoneCCid';


  loginCC(form: loginI): Observable<any> {
    return this.http.post<any>(this.apiUrl, form);
  }

  logout(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${token}`};

    return this.http.get<any>(this.apiLogout , {headers});
  }

  searchPhoneCCid(cc: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiSearchCC}/${cc}`);
  }



}
