import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeopleI } from 'src/app/models/people.interface';
import { responsiveI } from 'src/app/models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl: string = 'http://127.0.0.1:8000/api/people';

  constructor(private http: HttpClient) {}

  //mostrar todas las personas
  getPeople(): Observable<PeopleI[]> {
    return this.http.get<PeopleI[]>(this.apiUrl);
  }

  //para guardar una persona
  addPeople(form: PeopleI): Observable<responsiveI>
  {
    return this.http.post<responsiveI>(this.apiUrl, form);
  }
}
