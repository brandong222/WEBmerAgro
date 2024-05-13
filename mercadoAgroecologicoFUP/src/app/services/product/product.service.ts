import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://127.0.0.1:8000/api/product';

  //para traer datos de la api
  getproductos(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(this.apiUrl, { headers });
  }

  getproductosList(): Observable<ProductI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI>(this.apiUrl, { headers });
  }

  //guardar producto

  addProduct(form: ProductI): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(this.apiUrl, form, { headers });
  }

  // para obtener un producto por ID
  getProductId(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }

  // para eliminar un producto
  deleteProduct(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<responsiveI>(`${this.apiUrl}/${id}`, { headers });
  }

  // para actualizar un producto
  updateProduct(id: number, form: ProductI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<responsiveI>(`${this.apiUrl}/${id}`, form, {
      headers,
    });
  }

  //traer datos relacionados

}
