import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  constructor(private http: HttpClient) {}

  private apiJOIN: string = 'http://127.0.0.1:8000/api/usuariosPersonas';
  private apiJOIN2: string = 'http://127.0.0.1:8000/api/productosProvedoresPernas';


  getDataProvidersUser(): Observable<responsiveI> {
    return this.http.get<responsiveI>(this.apiJOIN);
  }

  getProductProvider(): Observable<responsiveI>{
    return this.http.get<responsiveI>(this.apiJOIN2);
  }

}