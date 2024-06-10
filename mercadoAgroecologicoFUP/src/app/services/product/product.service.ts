import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = `${environment.urlMain}product`;
  private filterUrl: string = `${environment.urlMain}`;

  //para traer datos de la api
  getproductos(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(this.apiUrl, { headers });
  }

  //guardar producto

  addProduct(form: ProductI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<responsiveI>(this.apiUrl, form, { headers });
  }

  // para obtener un producto por ID
  getProductId(id: number): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(`${this.apiUrl}/${id}`, { headers });
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

  //usar filtros
  filterName(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(`${this.filterUrl}filtrarPorNombre`, { headers });
  }



  filtrarPorPrecioMenorAMayor(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(`${this.filterUrl}filtrarPorPrecioMenorAMayor`, { headers });
  }

  filtrarPorPrecioMayorAMenor(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(`${this.filterUrl}filtrarPorPrecioMayorAMenor`, { headers });
  }

  filtrarPorCertificado(): Observable<ProductI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<ProductI[]>(`${this.filterUrl}filtrarPorCertificado`, { headers });
  }


}
