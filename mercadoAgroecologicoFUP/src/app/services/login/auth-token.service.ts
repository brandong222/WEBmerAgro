import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(private route: Router) { }

  autentificar(): boolean{
    const token = localStorage.getItem('token');
    return!!token;
  }

  logoutAuth() {
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
}
