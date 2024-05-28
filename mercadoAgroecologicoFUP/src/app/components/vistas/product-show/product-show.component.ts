import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductSHOWComponent implements OnInit{


  //tomar id de las rutas
  productIdNumber: number = Number(
    this.routeA.snapshot.paramMap.get('id')
  );

  //variables y arreglos
  productUnitArray: any[] = [];

constructor(
  private routeA: ActivatedRoute,
  private productS: ProductService,
  private route: Router,
){}


ngOnInit(): void {

    this.mostrarProductoID();
}


mostrarProductoID(){
 this.productS.getProductId(Number(this.productIdNumber)).subscribe(data=>{

  this.productUnitArray = data;
 })
}



//NAVEGACION **

//para editar producto
navEditarProducto(){
  this.route.navigate(['product/edit/',this.productIdNumber]);
}

}
