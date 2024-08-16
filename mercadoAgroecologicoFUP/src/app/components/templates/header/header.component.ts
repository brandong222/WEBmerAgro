import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

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

    const user_name = localStorage.getItem('user_name');
    if (user_name) {
      this.FKusuarioName = user_name;
    } else {
      this.FKusuarioName = 'usuario';
    }

    let datosSesion = sessionStorage.getItem('usuario_login');
    if (datosSesion) {
      let usuarioLogin: UserI = JSON.parse(datosSesion);
      this.RolUser = String(usuarioLogin.use_rol);
    } else {
      console.log('No hay datos en el almacenamiento de sesión.');
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

  //ver todos los usuarios
  navUserList(){
    this.route.navigate(['/user/list']);
  }

  //cerrar sesion borrar token
  cerrarSesion() {

    Swal.fire({
      title: 'cerrar sesión',
      text: "¿Desea cerrar sesión?",
      icon:'question',
      showCancelButton: true,
      cancelButtonColor: '#222',
      confirmButtonColor: '#944',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Si, salir',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginS.logout().subscribe((data) => {
        });
        localStorage.removeItem('token');
          localStorage.removeItem('user_name');
          localStorage.removeItem('id_user');
          sessionStorage.removeItem('usuario_login');
          this.route.navigate(['']);

      }
    })
  }


  showDocumentation(){
    Swal.fire('', '', 'question');


    Swal.fire({
      title:'Documentación',
      html: '¿Decea ver la documentación de mercado agroecológico 4.0?',
      showCancelButton: true,
      cancelButtonColor: '#222',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'ver documentación (guía)',
      confirmButtonColor: '#32974f',
    }).then((result) => {
      if (result.isConfirmed) {
        const ruta = '../../../../assets/documentation/manual.pdf';
        window.open(ruta, '_blank');

      }
    });
  }

}
