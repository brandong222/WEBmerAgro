import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { PeopleService } from 'src/app/services/people/people.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{


  ngOnInit(): void {
      this.traerDatosDeSesion();
  }

  constructor(private peopleS:PeopleService ){}


  traerDatosDeSesion() {
    // Obtener los datos del almacenamiento de sesión
    const datosGuardados = window.sessionStorage.getItem('usuario_login');

    // Verificar si hay datos
    if (datosGuardados) {
      // Convertir la cadena JSON de vuelta a un objeto JavaScript
      const dataR: UserI = JSON.parse(datosGuardados);
      console.log(dataR.people_id);

      this.peopleS.getPersonById(Number(dataR.people_id)).subscribe(data=>{
        console.log(data);
      })

    } else {
      console.log('No hay datos guardados en la sesión.');
    }
  }

}
