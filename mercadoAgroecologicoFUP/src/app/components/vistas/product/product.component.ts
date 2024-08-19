import { JoinService } from './../../../services/join/join.service';
import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people/people.service';
import { UserI } from 'src/app/models/user.interface';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  bandera_loading: boolean = true;

  //primero se crea arreglo usando interfaz de product
  productArray: any[] = [];
  //busqueda
  busqueda_clave = '';
  RolUser:string = 'usuario';


  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private fkpeopleS: PeopleService
  ) {

  }

  ngOnInit(): void {
    this.mostrarProductos();

    let datosSesion = sessionStorage.getItem('usuario_login');
    if (datosSesion) {
      let usuarioLogin: UserI = JSON.parse(datosSesion);
      this.RolUser = String(usuarioLogin.use_rol);
    } else {
      console.log('No hay datos en el almacenamiento de sesión.');
    }

  }



  //metodos fk
  mostrarProductos() {
    this.bandera_loading = false;
    this.fkjoinS.getProductProvider().subscribe((data) => {
      this.productArray = data.data;
      this.productArray.sort(() => Math.random() - 0.5);
    this.bandera_loading = true;
    });
  }

  //FILTROS DE PRODUCTOS FUNCIONES

  filtrarNombre() {
    this.productS.filterName().subscribe((data) => {
      this.productArray = data;
    });
  }

  filtrarMenorMayorPrecio() {
    this.productS.filtrarPorPrecioMenorAMayor().subscribe((data) => {
      this.productArray = data;
    });
  }

  filtrarMayorMenorPrecio() {
    this.productS.filtrarPorPrecioMayorAMenor().subscribe((data) => {
      this.productArray = data;
    });
  }

  filtrarCertificados() {
    this.productS.filtrarPorCertificado().subscribe((data) => {
      this.productArray = data;
    });
  }

  navfiltrarPorUbicacion() {
    this.route.navigate(['address']);
  }



  //FUNCION PARA CONTROLAR FILTROS

  filtrosProductos() {
    //obtener evento change
    const selectElement = document.getElementById(
      'filtros'
    ) as HTMLSelectElement;
    const valorSelecionado = selectElement.value;
    console.log(`Valor seleccionado: ${valorSelecionado}`);

    switch (valorSelecionado) {
      case 'none':
        //funcion
        this.mostrarProductos();
        break;

      case 'nombre':
        this.filtrarNombre();
        break;

      case 'menor':
        this.filtrarMenorMayorPrecio();
        break;
      case 'mayor':
        this.filtrarMayorMenorPrecio();
        break;
      case 'certificado':
        this.filtrarCertificados();
        break;


      default:
        this.mostrarProductos();
        break;
    }
  }

  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.mostrarProductos();
      return;
    }
    this.productArray = this.productArray.filter((product) =>
      product.pro_name.toLowerCase().includes(this.busqueda_clave.toLowerCase())
    );
  }

  //NAVEGACION
  verproductoIndividual(id: number) {
    this.route.navigate(['/product/show/', id]);
  }


  //navegacion de submenu

  navProductos(){
    this.route.navigate(['/product']);
  }


  navMisProductos(){
    this.route.navigate(['/product/own']);
  }

  navSubirProducto(){
    this.route.navigate(['/product/add']);

  }

}
