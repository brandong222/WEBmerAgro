import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  peopleArray: superInterfazI[] = [];

  constructor(
    private route: Router,
    private peopleS: PeopleService,
    private fkjoinS: JoinService
  ) {}

  ngOnInit(): void {

    this.mostrarPeople();
  }


  mostrarPeople(){
    const user_id: UserI = this.traerDatosSesion();

    this.fkjoinS.getjoinUserPeople(Number(user_id.id)).subscribe(data=>{
      console.log(data.data)
      this.peopleArray = data.data;
    })
  }


  traerDatosSesion(){
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }




// controles para cambio de rol
activarControlProductor(people_id: number){

}







  //NAVEGACION

  //ver datos de sesion
  navDatosSesion(){
    this.route.navigate(['/user/']);
  }


  navDatosProveedor(){
    this.route.navigate(['/provider/own'])
  }

  navEditarPerfil(id:number){
    this.route.navigate(['/people/edit/'+id])
  }

}
