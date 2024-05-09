import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderI } from 'src/app/models/provider.interface';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private apiUrl: string = "http://127.0.0.1:8000/api/provider"

  constructor(private http: HttpClient) { }
  //mostrar datos de provider
  getProvider():Observable<ProviderI[]>{
    const token = localStorage.getItem('token');
    const headers = {Authorization: `Beares ${token}`};
  return this.http.get<ProviderI[]>(this.apiUrl, {headers});
  }

  addProvider(form: ProviderI): Observable<responsiveI>{
    const token = localStorage.getItem('token');
    const headers = {Authorization: `Beares ${token}`};
    return this.http.post<responsiveI>(this.apiUrl, form, {headers});
  }
}
