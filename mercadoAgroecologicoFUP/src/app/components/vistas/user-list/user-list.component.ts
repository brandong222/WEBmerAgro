import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserI } from '../../../models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleI } from '../../../models/people.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserLISTComponent implements OnInit{

  bandera_sesion_rol: boolean = false;
  userArray:  any[] = [];
  busqueda_clave = '';

constructor(
  private userS: UserService,
  private route: Router,
  private fkjoinS: JoinService,

){

}
  ngOnInit(): void {
    const sesion: UserI = this.traerDatosSesion();
    if(sesion.use_rol === 'admin'){
      this.bandera_sesion_rol = true;
    }
    this.mostrarUsuarios();
  }
  mostrarUsuarios(){
    this.fkjoinS.showPeopleUsers().subscribe(data=>{
    this.userArray = data;
    console.log(data)
    })
  }

  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.mostrarUsuarios();
      return;
    }
    this.userArray = this.userArray.filter((people) =>
      people.use_cc.toLowerCase().includes(this.busqueda_clave.toLowerCase())
    );
  }

  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }

  //NAVEGACION
  navPerfilPeople(id_people: number){
    this.route.navigate(['/people/edit/'+id_people]);
  }
}
