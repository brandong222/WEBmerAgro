import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { loginI } from 'src/app/models/login.interface';

import { Router } from '@angular/router';
import { responsiveI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    use_cc: new FormControl('', Validators.required),
    use_password: new FormControl('', Validators.required),
  });

  constructor(private loginS: LoginService, private router: Router) {}

  onLogin(form: loginI) {
    this.loginS.loginCC(form).subscribe(
      (data) => {
        let dataR: responsiveI = data;

        if (data.status) {
          localStorage.setItem('token', dataR.token);
          this.router.navigate(['home']);
        }
      },
      (error) => {
        // Aquí manejas el error alertas
        alert('Error al intentar iniciar sesión:');
      }
    );
  }
}
