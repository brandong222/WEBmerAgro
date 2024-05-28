import { JoinService } from './../../../services/join/join.service';
import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { UserService } from 'src/app/services/user/user.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //primero se crea arreglo usando interfaz de product

  productArray: any[] =[];

  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private fkpeopleS: PeopleService,
  ) {}

  ngOnInit(): void {
   // this.mostrarProductos();
    this.fkGetProviders();
  }


  //metodos fk
  fkGetProviders() {
   this.fkjoinS.getProductProvider().subscribe(data=>{
    console.log(data.status);
    console.log(data.data);
    this.productArray = data.data;
   })

  }

  verproductoIndividual(id: number){
  this.route.navigate(['/product/show/',id]);
  }

}
