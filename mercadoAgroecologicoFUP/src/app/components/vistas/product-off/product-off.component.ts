import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-off',
  templateUrl: './product-off.component.html',
  styleUrls: ['./product-off.component.css']
})
export class ProductOffComponent implements OnInit{

  productArray: any[] = [];
  busqueda_clave = '';

constructor(
  private joinS: JoinService,
  private productS: ProductService
){

}


ngOnInit(): void {
  this.traerListaProductos();
}

traerListaProductos() {
  this.joinS.getProductProvider().subscribe(
    (data) => {
      console.log('Productos:', data);
      this.productArray = data.data;
      this.productArray.sort(() => Math.random() - 0.5);

    },
    (error) => {
      console.error('Error al obtener los productos:', error);
    }
  );
}


  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.traerListaProductos();
      return;
    }
    this.productArray = this.productArray.filter((product) =>
      product.pro_name.toLowerCase().includes(this.busqueda_clave.toLowerCase())
    );
  }


}
