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

  //bandera  y provedor_id
  banderaCalificar: boolean = true;
  rolUsuario: string = "";

  //variables y arreglos
  productUnitArray: any[] = [];
  banderaStar: boolean = false;
  productosRelacionados: any[] = [];
  numeroContacto: number = 0;
  contarEstrellas: number = 0;

  constructor(
    private routeA: ActivatedRoute,
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private providerS: ProviderService,
    private peopleS: PeopleService,
    private providers: ProviderService
  ) {}

  ngOnInit(): void {
    this.validarRoles();
    this.navContactar();
    this.mostrarProductoID();
    this.mostrarOtrosProductos(); // para mas productos
  }

  //validar roles de usuario
  validarRoles(){
    const sesion: UserI= this.traerDatosSesion();
    this.rolUsuario = String(sesion.use_rol);
  }

  //para obtener estrellas de componente
  obtenerNumeroEstrellas(star: number) {
    this.contarEstrellas = star;
  }

  mostrarProductoID() {
    this.productS
      .getProductId(Number(this.productIdNumber))
      .subscribe((data) => {
        this.productUnitArray = data;
      });
  }

  eliminarProducto(id: number) {
    ////////////// <---- modificar alerta
    const respuesta = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto?'
    );

    if (respuesta) {
      this.productS.deleteProduct(id).subscribe((data) => {
      //  console.log(data);
        alert(data.message);
        this.route.navigate(['/product']);
      });
    }
  }

  mostrarOtrosProductos() {

    this.productS.getproductos().subscribe(data=>{
      this.productosRelacionados = data;
    })


  }

  //Traer datos sesion para habilitar por rol las opciones
  traerDatosSesion(){
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }

  //NAVEGACION **

  //para editar producto
  navEditarProducto() {
    this.route.navigate(['product/edit/', this.productIdNumber]);
  }

  //para ir a perfil

  navPerfilShow(id_product: number) {
    this.route.navigate(['/people/show/' + id_product]);
  }

  //ir a ventana para calificar con strellas
  navStar() {
    this.banderaStar = !this.banderaStar;
    if (!this.banderaStar) {
      //traer datos id_provedor
      const id_product = this.productIdNumber;

      //traer id del provedor con id de su producto
      this.productS.getProductId(id_product).subscribe((data) => {
        const datosProduct: ProductI = data[0];

        //guardar cambios de estrellas para proveedor
        this.providerS
          .updateOnlyRanking(
            Number(datosProduct.providers_id),
            this.contarEstrellas
          )
          .subscribe((data) => {
            alert(data.status);
          });
      });
    }
  }

  navContactar() {
    const id_product = this.productIdNumber;

    //traer id del provedor con id de su producto
    this.productS.getProductId(id_product).subscribe((data) => {
      const datosProduct: ProductI = data[0];
      console.log(datosProduct.providers_id);

      this.providerS
        .getProviderId(Number(datosProduct.providers_id))
        .subscribe((data) => {
          const dataProvider: ProviderI = data.data;

          this.peopleS
            .getPersonById(Number(dataProvider.people_peo_id))
            .subscribe((data) => {
              const numeroPeople: PeopleI = data.data;
              this.numeroContacto = Number(numeroPeople.peo_phone);
            });
        });
    });
  }
}
