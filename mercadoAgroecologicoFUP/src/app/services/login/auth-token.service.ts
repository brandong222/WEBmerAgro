import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenService {
  private apiUrl: string = `${environment.urlMain}usuariosPersonas`;
  private apiUrlToken: string = `${environment.urlMain}auth/verifyToken`;


  constructor(private route: Router, private http: HttpClient) {}

  autentificar(): Observable<Boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    } else {
      return of(true);
    }
  }

  verTokenVencido(token: string): Observable<responsiveI>{

    return this.http.get<responsiveI>(`${this.apiUrlToken}/${token}`);

  }

  logoutAuth() {
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
}
