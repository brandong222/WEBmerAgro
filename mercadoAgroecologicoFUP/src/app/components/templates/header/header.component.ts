import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  RolUser: string = 'usuario';

  constructor(private route: Router, private loginS: LoginService) {}

  FKusuarioName: string = '';

  ngOnInit(): void {
    let datosSesion = sessionStorage.getItem('usuario_login');
    if (datosSesion) {
      let usuarioLogin: UserI = JSON.parse(datosSesion);
      this.RolUser = String(usuarioLogin.use_rol);
    } else {
      console.log('No hay datos en el almacenamiento de sesión.');
    }

    const user_name = localStorage.getItem('user_name');
    if (user_name) {
      this.FKusuarioName = user_name;
    } else {
      this.FKusuarioName = 'usuario';
    }
  }


  //**NAVEGACIÓN****//

  //para volver al inicio
  navInicio() {
    this.route.navigate(['/home']);
  }

  //ver productos
  navVerProductos() {
    this.route.navigate(['/product']);
  }

  //mis productos <- por implementar

  //subir un producto
  navSubirProductos() {
    this.route.navigate(['/product/add']);
  }

  //ver provedores
  navVerProvedores() {
    this.route.navigate(['/provider']);
  }

  navEnviarSolicitud(){
    this.route.navigate(['/request/add']);
  }

  //ver perfil
  navVerPeople() {
    this.route.navigate(['/people']);
  }

  //ver solicitudes requestApp
  navverRequest() {
    this.route.navigate(['/request']);
  }

  //ver categorias
  navVerCategorias() {
    this.route.navigate(['/category']);
  }

  //ver productos propios
  navMisProductos(){
    this.route.navigate(['/product/own'])
  }

  //cerrar sesion borrar token
  cerrarSesion() {
    this.loginS.logout().subscribe((data) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      this.route.navigate(['']);
    });
  }
}
