import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { ProviderI } from 'src/app/models/provider.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
})
export class ProductSHOWComponent implements OnInit {
  //tomar id de las rutas
  productIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  //variables y arreglos
  productUnitArray: any[] = [];
  banderaStar: boolean = false;
  productosRelacionados: any[] = [];
  numeroContacto: number = 0;

  constructor(
    private routeA: ActivatedRoute,
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private providerS: ProviderService,
    private peopleS: PeopleService
  ) {}

  ngOnInit(): void {
    this.navContactar();
    this.mostrarProductoID();
    this.mostrarProductosProveedores(); // para mas productos

  }





  mostrarProductoID() {
    this.productS
      .getProductId(Number(this.productIdNumber))
      .subscribe((data) => {
        this.productUnitArray = data;
      });
  }

  eliminarProducto(id: number) {
    const respuesta = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto?'
    );

    if (respuesta) {
      this.productS.deleteProduct(id).subscribe((data) => {
        console.log(data);
        alert(data.message);
        this.route.navigate(['/product']);
      });
    }
  }

  mostrarProductosProveedores() {

    const id_product = this.productIdNumber;

    //traer id del provedor con id de su producto
    this.productS.getProductId(id_product).subscribe(data=>{
      const datosProduct: ProductI = data[0];


      this.fkjoinS.joinProduProviderID(Number(datosProduct.providers_id)).subscribe((data) => {
        console.log(data.data);
        this.productosRelacionados = data.data;
      });
    })

  }

  //NAVEGACION **

  //para editar producto
  navEditarProducto() {
    this.route.navigate(['product/edit/', this.productIdNumber]);
  }

  //para ir a perfil

  navPerfil() {
    this.route.navigate(['/people']);
  }

  //ir a ventana para calificar con strellas
  navStar() {
    this.banderaStar = !this.banderaStar;
  }

  navContactar() {

    const id_product = this.productIdNumber;

    //traer id del provedor con id de su producto
    this.productS.getProductId(id_product).subscribe(data=>{
      const datosProduct: ProductI = data[0];
      console.log(datosProduct.providers_id);

      this.providerS.getProviderId(Number(datosProduct.providers_id)).subscribe(data=>{
      const dataProvider: ProviderI = data.data;

      this.peopleS.getPersonById(Number(dataProvider.people_peo_id)).subscribe(data=>{
        const numeroPeople: PeopleI = data.data;
        this.numeroContacto = Number(numeroPeople.peo_phone);

      })

      })
    });
  }
}
