import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { loginI } from 'src/app/models/login.interface';

import { Router } from '@angular/router';
import { responsiveI } from 'src/app/models/response.interface';
import { PeopleService } from 'src/app/services/people/people.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  intentos_contrasena: number = 0;

  loginForm = new FormGroup({
    use_cc: new FormControl(null, [Validators.required,Validators.minLength(1) ]),
    use_password: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  });



  constructor(
    private loginS: LoginService,
    private router: Router,
    private fkpeopleS: PeopleService
  ) {}

  ngOnInit(): void {
    this.revisarToken();
  }

  revisarToken() {
    if (localStorage.getItem('token')) {

      
      this.router.navigate(['home']);
    }
  }

  onLogin(form: loginI) {

    if(this.loginForm.valid){
    this.loginS.loginCC(form).subscribe(
      (data) => {
        let dataR: responsiveI = data;

        if (data.status) {
          localStorage.setItem('token', dataR.token);

          //traer datos de persona para poner el nombre
          let fk_people_Id = dataR.data.people_id;

          //guardar datos de sesion en almacenamiento de sesion
          window.sessionStorage.setItem(
            'usuario_login',
            JSON.stringify(dataR.data)
          );

          this.fkpeopleS.getPersonById(fk_people_Id).subscribe((people) => {
            //guardar en localstorage
            localStorage.setItem('user_name', people.data.peo_name);
            localStorage.setItem('id_user', people.data.id);
          });

          this.router.navigate(['home']);
        }
      },
      (error) => {
        // Aquí manejas el error alertas
        Swal.fire(
          'Inicio de sesion',
          'Credenciales incorrectas',
          'error'
        )
        this.intentos_contrasena += 1;
      }
    );

  }else{
    Swal.fire('Inicio de sesion', 'Verifique los campos e intente nuevamente', 'error');
  }
  }

  //navegación
  navigateToRegister() {
    this.router.navigate(['/people/add']);
  }


  navRecuperarContra(){
    this.router.navigate(['/forget/password'])
  }
}
