import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit{
  //tomar id de las rutas
  id_category: number = Number(this.routeA.snapshot.paramMap.get('id'));
  //primero se crea arreglo usando interfaz de product
  productArray: any[] = [];
  //busqueda
  busqueda_clave = '';
  noProductsFound = false;
  title_category: string = 'categorías'
  bandera_loading:boolean = true;


  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private fkjoinS: JoinService,
    private categoryS: CategoryService,
  ){}


  ngOnInit(): void {
    this.mostrarProductos();
    }

  mostrarProductos() {
    this.bandera_loading= false;

    this.categoryS.filterProductCategoryID(this.id_category).subscribe((data) => {

      if (data.length === 0) {
        Swal.fire('Productos', 'Por el momento no hay productos con esta categoria', 'info')
        this.route.navigate(['/home']);
      }else{
        let title: any = data[0];
        this.title_category =  (title.cat_name);
        this.productArray = data;
        this.productArray.sort(() => Math.random() - 0.5);
        this.bandera_loading= true;
      }



    });
  }


  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.mostrarProductos();
      this.noProductsFound = false; // Muestra todos los productos si la búsqueda está vacía
    } else {
      this.noProductsFound = false; // Inicializa como false para preparar la comprobación
      this.productArray = this.productArray.filter((product) =>
        product.pro_name.toLowerCase().includes(this.busqueda_clave.toLowerCase())
      );

      // Actualiza noProductsFound basado en si se encontraron productos o no
      this.noProductsFound = this.productArray.length === 0;
    }
  }

  //NAVEGACION
  verproductoIndividual(id: number) {
    this.route.navigate(['/product/show/', id]);
  }


  navVolverMain(){
    this.route.navigate(['/home']);

  }
}
