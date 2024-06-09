import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/services/people/people.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  banderaPassword: boolean = false;

  userForm = new FormGroup({
    id: new FormControl(0),
    use_cc: new FormControl('', Validators.required),
    use_password: new FormControl(''),
    use_rol: new FormControl('', Validators.required),
    use_status: new FormControl(1, Validators.required),
    people_id: new FormControl(1, Validators.required),
  });

  ngOnInit(): void {
    this.traerDatosDeSesion();
  }

  constructor(
    private peopleS: PeopleService,
    private fkJoinS: JoinService,
    private userS: UserService
  ) {}

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
    } else {
      console.log('No hay datos guardados en la sesión.');
    }
  }

  //metodo para actualizar datos de usuario
  actualizarUsuario(form: UserI) {
    this.userS.updateUser(Number(form.id), form).subscribe(
      (data) => {
      if (data.status) {
        Swal.fire(
          'Datos de usuario',
          'Datos actualizados exitosamente',
          'success'
        );
      }
    }
  ,(Error=>{
    Swal.fire(
      'Datos de usuario',
      'Por favor llene los campos',
      'error'
    );
  })
  );
  }

  //para la contraseña se aplica bandera en caso de habilitar campo
  cambiarPasseord() {
    this.banderaPassword = !this.banderaPassword;
  }
}
