import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/services/people/people.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {


  userForm = new FormGroup({
    use_cc: new FormControl('', Validators.required),
    use_password: new FormControl('', Validators.required),
    use_rol: new FormControl('', Validators.required),
    use_status: new FormControl(1, Validators.required),
    people_id: new FormControl(1, Validators.required),
  });

  ngOnInit(): void {
    this.traerDatosDeSesion();
  }

  constructor(
    private route:Router
  ) {}

  traerDatosDeSesion() {
    // Obtener los datos del almacenamiento de sesión
    const datosGuardados = window.sessionStorage.getItem('usuario_login');

    // Verificar si hay datos
    if (datosGuardados) {
      // Convertir la cadena JSON de vuelta a un objeto JavaScript
      const dataR: UserI = JSON.parse(datosGuardados);
      this.userForm.get('use_cc')?.setValue(dataR.use_cc || null);
      this.userForm.get('use_rol')?.setValue(dataR.use_rol || null);
      this.userForm.get('use_status')?.setValue(dataR.use_status || null);
      this.userForm.get('people_id')?.setValue(dataR.people_id || null);
    } else {

    }
  }

//NAVEGACION

navEditUser(){
  this.route.navigate(['/user/edit'])
}



}
