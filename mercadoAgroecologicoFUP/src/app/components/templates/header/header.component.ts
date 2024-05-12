import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

constructor(private route:Router, private loginS: LoginService){}

FKusuarioName: string = '';

ngOnInit(): void {
  const user_name = localStorage.getItem('user_name');
  if (user_name) {
    this.FKusuarioName =user_name;
  } else{
    this.FKusuarioName = "usuario";
  }
}



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
    localStorage.removeItem('user_name');
    this.route.navigate(['']);
  });
}

}
