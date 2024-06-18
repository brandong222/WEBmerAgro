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
  //busqueda
  busqueda_clave = '';

  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private fkpeopleS: PeopleService
  ) {}

  ngOnInit(): void {
    this.mostrarProductos();
  }

  //metodos fk
  mostrarProductos() {
    this.fkjoinS.getProductProvider().subscribe((data) => {
      this.productArray = data.data;
      this.productArray.sort(() => Math.random() - 0.5);
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

  filtrarPorUbicacion() {
    this.productS.filtrarPorUbicacion().subscribe((data) => {
      this.productArray = data;
    });
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

      case 'ubicacion':
      this.filtrarPorUbicacion();
      break
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
}
