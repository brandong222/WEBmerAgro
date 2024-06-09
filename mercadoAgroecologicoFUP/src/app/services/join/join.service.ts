import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';
import { HttpClient } from '@angular/common/http';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  constructor(private http: HttpClient) { }

  private apiJOIN: string = 'http://127.0.0.1:8000/api/usuariosPersonas';
  private apiJOIN2: string = 'http://127.0.0.1:8000/api/productosProvedoresPernas';
  private apiJOIN3: string = 'http://127.0.0.1:8000/api/joinProdProvPeopleID';
  private apiJOIN4: string = 'http://127.0.0.1:8000/api/joinReqPeoUsu';
  private apiJOIN5: string = 'http://127.0.0.1:8000/api/joinUserPeople';
  private apiJOIN6: string = 'http://127.0.0.1:8000/api/joinProvedorpeopleID';
  private apiJOIN7: string = 'http://127.0.0.1:8000/api/showReqPeoUsu';
  private apiJOIN8: string = 'http://127.0.0.1:8000/api/joinProduProviderID';
  private apiJOIN9: string = 'http://127.0.0.1:8000/api/showPeopleUsers';
  private apiJOIN10: string = 'http://127.0.0.1:8000/api/joinUserPeopleID';
  private apiJOIN11: string = 'http://127.0.0.1:8000/api/compararSesionProviderConProductProviderID';








  //traer la combinacion de people, user
  getDataProvidersUser(): Observable<responsiveI> {
    return this.http.get<responsiveI>(this.apiJOIN);
  }

  //traer la combinacion de people, provider, product
  getProductProvider(): Observable<responsiveI> {
    return this.http.get<responsiveI>(this.apiJOIN2);
  }

  getProdProvPeopleID(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN3}/${id}`);
  }

  getjoinReqPeoUsu(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN4}/${id}`);
  }

  getjoinUserPeople(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN5}/${id}`);
  }
  joinProvedorpeopleID(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN6}/${id}`);
  }

  showReqPeoUsu(): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN7}`);
  }
  joinProduProviderID(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN8}/${id}`);
  }

  showPeopleUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiJOIN9}`);
  }

  joinUserPeopleID(id: number): Observable<responsiveI> {
    return this.http.get<responsiveI>(`${this.apiJOIN10}/${id}`);
  }

  //comparar id providers (sesion vs dueño del producto)
  compararSesionProviderConProductProviderID(id_provider_prod: number, id_prov_sesion: number) {
    return this.http.get<responsiveI>(`${this.apiJOIN11}/${id_provider_prod}/${id_prov_sesion}`);
  }



}
