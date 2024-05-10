import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private route:Router, private loginS: LoginService){}

//**NAVEGACIÓN****//

//para volver al inicio
navInicio(){
  this.route.navigate(['/home']);
}

//ver productos
navVerProductos(){
  this.route.navigate(['/product'])
}

//mis productos <- por implementar

//subir un producto
navSubirProductos(){
  this.route.navigate(['/product/add'])
}

//ver provedores
navVerProvedores(){
  this.route.navigate(['/provider']);
}


//ver perfil
navVerPeople(){
  this.route.navigate(['/people']);
}

//ver solicitudes requestApp
navverRequest(){
  this.route.navigate(['/request']);
}

//ver categorias
navVerCategorias(){
  this.route.navigate(['/category']);
}

//cerrar sesion borrar token
cerrarSesion() {
  this.loginS.logout().subscribe((data) => {
    localStorage.removeItem('token');
    this.route.navigate(['']);
  });
}

}
