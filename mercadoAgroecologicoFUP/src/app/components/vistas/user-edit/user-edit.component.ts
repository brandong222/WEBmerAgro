import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import { PeopleService } from 'src/app/services/people/people.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  banderaPassword: boolean = false;
  userForm: FormGroup;
  userFormNoPassword: FormGroup;


  ngOnInit(): void {
    this.traerDatosDeSesion();
  }

  constructor(
    private peopleS: PeopleService,
    private fkJoinS: JoinService,
    private userS: UserService,
    private route: Router,
    private loginS: LoginService,
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(0),
      use_cc: new FormControl('', Validators.required),
      use_rol: new FormControl('', Validators.required),
      use_status: new FormControl(1, Validators.required),
      people_id: new FormControl(1, Validators.required),
    });

    this.userFormNoPassword = new FormGroup({
      id: new FormControl(0),
      use_cc: new FormControl('', Validators.required),
      use_rol: new FormControl('', Validators.required),
      use_password: new FormControl(null, Validators.required),
      use_status: new FormControl(1, Validators.required),
      people_id: new FormControl(1, Validators.required),
    });
  }

  traerDatosDeSesion() {
    // Obtener los datos del almacenamiento de sesión
    const datosGuardados = window.sessionStorage.getItem('usuario_login');

    // Verificar si hay datos
    if (datosGuardados) {
      // Convertir la cadena JSON de vuelta a un objeto JavaScript
      const dataR: UserI = JSON.parse(datosGuardados);
      this.userForm.get('id')?.setValue(Number(dataR.id));
      this.userForm.get('use_cc')?.setValue(dataR.use_cc || null);
      this.userForm.get('use_rol')?.setValue(dataR.use_rol || null);
      this.userForm.get('use_status')?.setValue(dataR.use_status || null);
      this.userForm.get('people_id')?.setValue(dataR.people_id || null);


      this.userFormNoPassword.get('id')?.setValue(Number(dataR.id));
      this.userFormNoPassword.get('use_cc')?.setValue(dataR.use_cc || null);
      this.userFormNoPassword.get('use_rol')?.setValue(dataR.use_rol || null);
      this.userFormNoPassword.get('use_status')?.setValue(dataR.use_status || null);
      this.userFormNoPassword.get('people_id')?.setValue(dataR.people_id || null);
    } else {
      console.log('No hay datos guardados en la sesión.');
    }
  }


  actualzarUsuarioPassword(form: UserI){
    if (this.userFormNoPassword.validator) {
      Swal.fire(
        'Datos de usuario',
        'Verifique sus datos e intente nuevamente',
        'error'
      );
    }else{
     if(form.use_password == null){
  Swal.fire('Datos de usuario', 'Por favor ingrese una contraseña', 'error')
     }else{
      console.log('con contraseña guardado')
      console.log(form)
      this.userS.updateUser(Number(form.id), form).subscribe(
        (data) => {
          if (data.status) {
            Swal.fire(
              'Datos de usuario',
              'Datos actualizados exitosamente',
              'success'
            );
            this.route.navigate(['/people']);
          }
        },
        (Error) => {
          Swal.fire(
            'Datos de usuario',
            'Por favor llene los campos',
            'error'
          );
        }
      );

     }
    }
  }

  //metodo para actualizar datos de usuario
  actualizarUsuario(form: UserI) {
    console.log(form)
    if (this.userForm.validator) {
      Swal.fire(
        'Datos de usuario',
        'Verifique sus datos e intente nuevamente',
        'error'
      );
    } else {
        this.userS.updateUser(Number(form.id), form).subscribe(
          (data) => {
            if (data.status) {
              Swal.fire(
                'Datos de usuario',
                'Datos actualizados exitosamente',
                'success'
              );
              //si actualiza su usuario se cierra la sesion
      this.cerrarSesion();
              }
            },(Error) => {
            Swal.fire(
              'Datos de usuario',
              'Por favor llene los campos',
              'error'
            );
          }
        );

    }

  }

  cerrarSesion() {
    this.loginS.logout().subscribe((data) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      this.route.navigate(['']);
    });
  }

  //para la contraseña se aplica bandera en caso de habilitar campo
  cambiarPasseord() {
    this.banderaPassword = !this.banderaPassword;
  }
}
