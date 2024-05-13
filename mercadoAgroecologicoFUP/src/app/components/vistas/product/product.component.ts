import { JoinService } from './../../../services/join/join.service';
import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { UserService } from 'src/app/services/user/user.service';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //primero se crea arreglo usando interfaz de product
  productArray: ProductI[] = [];

  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkproviderS: ProviderService,
    private fkuserS: UserService,
    private fkpeopleS: PeopleService,
    private fkjoinS: JoinService
  ) {}

  ngOnInit(): void {
    //this.mostrarProductos();
    this.fkGetProviders();
  }

  mostrarProductos() {
    this.productS.getproductos().subscribe((data) => {
      //console.log(data);
      this.productArray = data;
    });
  }
  //metodos fk
  fkGetProviders() {
    this.productS.getproductosList().subscribe((productos) => {
      console.log(productos);
    });

    this.fkjoinS.getDataProvidersUser().subscribe((data) => {
      console.log(data.data);
    });
  }
}
