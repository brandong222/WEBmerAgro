import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';
import { HttpClient } from '@angular/common/http';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JoinService {
  constructor(private http: HttpClient) { }



  private apiJOIN: string = `${environment.urlMain}usuariosPersonas`;
  private apiJOIN2: string =  `${environment.urlMain}productosProvedoresPernas`;
  private apiJOIN3: string =  `${environment.urlMain}joinProdProvPeopleID`;
  private apiJOIN4: string =  `${environment.urlMain}joinReqPeoUsu`;
  private apiJOIN5: string =  `${environment.urlMain}joinUserPeople`;
  private apiJOIN6: string =  `${environment.urlMain}joinProvedorpeopleID`;
  private apiJOIN7: string =  `${environment.urlMain}showReqPeoUsu`;
  private apiJOIN8: string =  `${environment.urlMain}joinProduProviderID`;
  private apiJOIN9: string =  `${environment.urlMain}showPeopleUsers`;
  private apiJOIN10: string =  `${environment.urlMain}joinUserPeopleID`;
  private apiJOIN11: string =  `${environment.urlMain}compararSesionProviderConProductProviderID`;








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
