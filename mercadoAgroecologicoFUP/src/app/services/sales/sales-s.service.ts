import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responsiveI } from 'src/app/models/response.interface';
import { SalesI } from 'src/app/models/sales.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SalesSService {

  private apiUrl: string = `${environment.urlMain}sales`;

  addSales(form: SalesI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<responsiveI>(this.apiUrl, form, { headers });
  }



  constructor(private http: HttpClient) {}
}
