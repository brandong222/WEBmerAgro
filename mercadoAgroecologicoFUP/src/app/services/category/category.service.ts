import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoryI } from 'src/app/models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://127.0.0.1:8000/api/category';

  AddCategory(form: categoryI): Observable<any> {

    console.log(form)
    return this.http.post<any>(this.apiUrl, form);
  }
}
