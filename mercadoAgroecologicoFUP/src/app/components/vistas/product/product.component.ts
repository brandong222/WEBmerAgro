import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //primero se crea arreglo usando interfaz de product
  products: ProductI[] = [];
  //segundo se inyecta las dependencias de servicio y rutas
  constructor(private productS: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.productS.getproductos().subscribe(data=>{
      console.log(data);
    })
  }
}
