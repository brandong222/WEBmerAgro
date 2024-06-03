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
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //primero se crea arreglo usando interfaz de product

  productArray: any[] = [];
  selectedFilter: string = 'none';
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  minPrice: number = 0; // Variables para almacenar el rango de precios
  maxPrice: number = 1000000;

  //segundo se inyecta las dependencias de servicio y rutas
  constructor(
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private fkpeopleS: PeopleService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.fkGetProviders();
  }


  //metodos fk
  fkGetProviders() {
    this.fkjoinS.getProductProvider().subscribe(data => {
      this.productArray = data.data;
      // Ordena aleatoriamente los productos
      this.productArray.sort(() => Math.random() - 0.5);
    })

  }

  applyFilter() {
    switch (this.selectedFilter) {
      case 'nombre':
        this.productArray.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        break;
      case 'menor':
        ;
        break;
      case 'mayor':
        ;
        break;
      case 'certificado':
        // Implementa la lógica para filtrar por certificado
        break;
      default:
        this.fkGetProviders(); // Cargar productos sin filtros si no hay filtro seleccionado
    }
  }


  onSearch(event: any): void {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.fkGetProviders();
    } else {
      this.fkGetProviders();
    }
  }

  //NAVEGACION
  verproductoIndividual(id: number){
    this.route.navigate(['/product/show/',id]);
    }
}
