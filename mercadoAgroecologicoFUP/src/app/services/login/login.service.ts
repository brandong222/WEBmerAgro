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

  loginCC(form: loginI): Observable<any> {
    return this.http.post<any>(this.apiUrl, form);
  }
}
