import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-own',
  templateUrl: './product-own.component.html',
  styleUrls: ['./product-own.component.css'],
})
export class ProductOWNComponent implements OnInit {
  productArray: any[] = [];
  //busqueda
  busqueda_clave = '';


  constructor(
    private route: Router,
    private fkjoinS: JoinService,
    private productS: ProductService,
  ) { }

  ngOnInit(): void {
    this.mostrarProductosPersona();
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
        this.mostrarProductosPersona();
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
        this.mostrarProductosPersona();
        break;
    }
  }

  mostrarProductosPersona() {
    const data: UserI = this.traerDatosSesion();
    console.log(data.people_id);

    this.fkjoinS.getProdProvPeopleID(Number(data.people_id)).subscribe(data => {
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

  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.mostrarProductosPersona();
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


  //para redirigir a subir producto en caso que no tenga
  navSubirProducto() {
    this.route.navigate(['/product/add'])
  }

 //navegacion de submenu

 navProductos(){
  this.route.navigate(['/product']);
}


navMisProductos(){
  this.route.navigate(['/product/own']);
}


}



