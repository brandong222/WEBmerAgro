import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
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

  constructor(
    private peopleS:PeopleService ,
    private fkJoinS: JoinService,

  ){}


  traerDatosDeSesion() {
    // Obtener los datos del almacenamiento de sesión
    const datosGuardados = window.sessionStorage.getItem('usuario_login');

    // Verificar si hay datos
    if (datosGuardados) {
      // Convertir la cadena JSON de vuelta a un objeto JavaScript
      const dataR: UserI = JSON.parse(datosGuardados);
      console.log(dataR.people_id);
      const fk_people_id = Number(dataR.people_id);

      this.fkJoinS.getProdProvPeopleID(fk_people_id).subscribe(data=>{
        console.log(data.status);
        console.log(data.data);


      })

    } else {
      console.log('No hay datos guardados en la sesión.');
    }
  }

}
