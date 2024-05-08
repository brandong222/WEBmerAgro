import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryI } from 'src/app/models/category.interface';

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

  //para añadir una category nueva
  AddCategory(form: categoryI): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(this.apiUrl, form, { headers });
  }
}
