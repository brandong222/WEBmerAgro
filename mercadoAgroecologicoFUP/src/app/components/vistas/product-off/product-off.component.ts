import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-off',
  templateUrl: './product-off.component.html',
  styleUrls: ['./product-off.component.css']
})
export class ProductOffComponent implements OnInit {
  productArray: any[] = [];
  pagedProducts: any[] = [];
  pages: number[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  busqueda_clave = '';

  constructor(
    private joinS: JoinService,
    private productS: ProductService
  ) {}

  ngOnInit(): void {
    this.traerListaProductos();
  }

  traerListaProductos() {
    this.joinS.getProductProvider().subscribe(
      (data) => {
        this.productArray = data.data;
        this.productArray.sort(() => Math.random() - 0.5);
        this.setupPagination();
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  setupPagination() {
    const totalPages = Math.ceil(this.productArray.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, ...]
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProducts = this.productArray.slice(startIndex, endIndex);
  }

  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.traerListaProductos();
      return;
    }
    this.productArray = this.productArray.filter((product) =>
      product.pro_name.toLowerCase().includes(this.busqueda_clave.toLowerCase())
    );
    this.setupPagination(); // Recalcula las páginas al filtrar
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.pages.length) {
      this.loadPage(page);
    }
  }
}
