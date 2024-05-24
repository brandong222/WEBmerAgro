import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';

@Component({
  selector: 'app-product-own',
  templateUrl: './product-own.component.html',
  styleUrls: ['./product-own.component.css'],
})
export class ProductOWNComponent implements OnInit {
  productArray: any[] = [];

  constructor(private route: Router, private fkjoinS: JoinService) {}

  ngOnInit(): void {
    this.mostrarProductosPersona();
  }

  mostrarProductosPersona() {
    const data: UserI = this.traerDatosSesion();
    console.log(data.people_id);

    this.fkjoinS.getProdProvPeopleID(Number(data.people_id)).subscribe(data=>{
      console.log(data.data);
      this.productArray = data.data;
    })

  }

  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }


//NAVEGACION


//para redirigir a subir producto en caso que no tenga
navSubirProducto(){
this.route.navigate(['/product/add'])
}


}
