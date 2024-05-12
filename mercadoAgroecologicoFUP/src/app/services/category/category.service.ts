import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryI } from 'src/app/models/category.interface';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://127.0.0.1:8000/api/category';

  //para traer datos de la api y db
  getCategory(): Observable<categoryI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<categoryI[]>(this.apiUrl, { headers });
  }

  getCategoryID(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }

  //para añadir una category nueva
  AddCategory(form: categoryI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<responsiveI>(this.apiUrl, form, { headers });
  }

  // para actualizar una categoría
  updateCategory(id: number, form: categoryI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<responsiveI>(`${this.apiUrl}/${id}`, form, {
      headers,
    });
  }

  // para eliminar una categoría
  deleteCategory(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }
}
