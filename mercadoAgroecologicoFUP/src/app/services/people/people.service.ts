import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeopleI } from 'src/app/models/people.interface';
import { responsiveI } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl: string = `${environment.urlMain}people`;

  constructor(private http: HttpClient) {}

  //mostrar todas las personas
  getPeople(): Observable<PeopleI[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<PeopleI[]>(this.apiUrl, {headers});
  }
  getPeopleList(): Observable<PeopleI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<PeopleI>(this.apiUrl, {headers});
  }

  //para guardar una persona
  addPeople(form: PeopleI): Observable<responsiveI> {
    return this.http.post<responsiveI>(this.apiUrl, form);
  }

  getPersonById(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<responsiveI>(`${this.apiUrl}/${id}`, {headers});
  }

  updatePerson(id: number, form: PeopleI): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<responsiveI>(`${this.apiUrl}/${id}`, form, {headers});
  }

  deletePerson(id: number): Observable<responsiveI> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<responsiveI>(`${this.apiUrl}/${id}`, {headers});
  }
}
