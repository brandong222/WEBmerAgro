import { Injectable } from '@angular/core';
import { loginI } from 'src/app/models/login.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = `${environment.urlMain}auth/login`;
  private apiLogout: string =  `${environment.urlMain}auth/logout`;
  private apiSearchCC: string =  `${environment.urlMain}auth/searchPhoneCCid`;
  private apiSendMail: string =  `${environment.urlMain}crearTokenAndEnviarCorreo`;
  private apiResetPassword: string =  `${environment.urlMain}contraseniaNueva`;



  loginCC(form: loginI): Observable<any> {
    return this.http.post<any>(this.apiUrl, form);
  }

  logout(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = {'Authorization': `Bearer ${token}`};

    return this.http.get<any>(this.apiLogout , {headers});
  }

  searchPhoneCCid(cc: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiSearchCC}/${cc}`);
  }


  sendEmailUser(peo_mail: string, use_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiSendMail}`,{peo_mail, use_id});
  }


  resetNewPassword(use_password: string, token: string, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiResetPassword}/${id}`,{use_password, token});

  }


}
