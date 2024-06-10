import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestI } from 'src/app/models/request.interface';
import { responsiveI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestappService {
  private apiUrl: string = `${environment.urlMain}requestApp`;

  constructor(private http: HttpClient) {}

  //mostrar datos de request

  getRequestapp(): Observable<RequestI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<RequestI[]>(this.apiUrl, { headers });
  }

  addRequestapp(form: RequestI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<responsiveI>(this.apiUrl, form, { headers });
  }


  addRequestContrasena(form: RequestI): Observable<responsiveI>{
    return this.http.post<responsiveI>(`${this.apiUrl}/contrasena`, form);
  }

  // para obtener una solicitud de aplicación por ID
  getRequestAppId(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }
  // para actualizar una solicitud de aplicación
  updateRequestApp(id: number, form: RequestI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<responsiveI>(`${this.apiUrl}/${id}`, form, {
      headers,
    });
  }

  // para eliminar una solicitud de aplicación
  deleteRequestApp(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }
}
