import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from 'src/app/models/user.interface';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://127.0.0.1:8000/api/user';

  //para listar usuarios
  getUser(): Observable<UserI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<UserI[]>(this.apiUrl, { headers });
  }

  //para guardar los usuarios
  AddUser(form: UserI): Observable<responsiveI> {
    return this.http.post<responsiveI>(this.apiUrl, form);
  }

  // para obtener un usuario por ID
  getUserId(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }

  // para eliminar un usuario
  deleteUser(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }

  // para actualizar un usuario
  updateUser(id: number, form: UserI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<responsiveI>(`${this.apiUrl}/${id}`, form, {
      headers,
    });
  }
}
