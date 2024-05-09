import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestI } from 'src/app/models/request.interface';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestappService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/requestApp';

  constructor(private http: HttpClient) {}

  //mostrar datos de request

  getRequestapp(): Observable<RequestI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<RequestI[]>(this.apiUrl, {headers});
  }

  addRequestapp(form: RequestI): Observable<responsiveI>{
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  return this.http.post<responsiveI>(this.apiUrl, form, {headers});

  }


}
