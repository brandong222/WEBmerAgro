import { JoinService } from './../../../services/join/join.service';
import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people/people.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //primero se crea arreglo usando interfaz de product

  productArray: any[] = [];


  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private fkpeopleS: PeopleService,
  ) { }

  ngOnInit(): void {
    this.mostrarProductos();
  }


  //metodos fk
  mostrarProductos() {
    this.fkjoinS.getProductProvider().subscribe(data => {
      this.productArray = data.data;
      this.productArray.sort(() => Math.random() - 0.5);
    })

  }

  filtrarNombre(){
    this.productS.filterName().subscribe(data=>{
      //this.productArray = data;
      console.log(data);
    })
  }




  //NAVEGACION
  verproductoIndividual(id: number){
    this.route.navigate(['/product/show/',id]);
    }
}
