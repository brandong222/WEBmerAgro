import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl: string = 'http://127.0.0.1:8000/api/imagen/';

  constructor(private http: HttpClient) { }


  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }

  getImageUrl(urlImage: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${urlImage}`);
  }

}
