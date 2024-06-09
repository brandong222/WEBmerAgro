import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { JoinService } from 'src/app/services/join/join.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ImagenService } from 'src/app/services/subirIMAGEN/imagen.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/app/models/category.interface';
import { UserI } from 'src/app/models/user.interface';
import { ProductI } from 'src/app/models/product.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  rolUser: string = '';
  productForm: FormGroup;
  fkCategoryList: categoryI[] = [];
  fkRolUserList: UserI[] = [];
  link_imagen_producto = '';

  //tomar id de las rutas
  productIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  constructor(
    private productS: ProductService,
    private route: Router,
    private fkcategoryS: CategoryService,
    private fkUserS: UserService,
    private imagenS: ImagenService,
    private fkjoinS: JoinService,
    private routeA: ActivatedRoute
  ) {
    this.productForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      pro_name: new FormControl('', Validators.required),
      pro_type: new FormControl('', Validators.required),
      pro_price: new FormControl(0, Validators.required),
      pro_certs: new FormControl('No', Validators.required),
      pro_image: new FormControl(''),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status: new FormControl(1, Validators.required),
      providers_id: new FormControl(0),
      categories_id: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.datosProductoId();
    this.getRolUser();
  }

  //Metodo actualizar
  actualizarProductos(form: ProductI) {
    console.log(form);

    this.productS.updateProduct(Number(form.id), form).subscribe((data) => {
      if(data.status){
        Swal.fire('Producto','Producto actualizado exitosamente','success')
      }else{
        Swal.fire('Producto','No se puede producto actualizar','error')

      }
    });
  }

  datosProductoId() {
    //metodo para tomar los datos guardados y ponerlos en producto que se decea editar

    this.productS.getProductId(this.productIdNumber).subscribe((data) => {
      if (data) {
        console.log(data[0]);

        this.productForm.get('id')?.setValue(Number(data[0].id));
        this.productForm.get('pro_name')?.setValue(data[0].pro_name || null);
        this.productForm.get('pro_type')?.setValue(data[0].pro_type || null);
        this.productForm.get('pro_certs')?.setValue(data[0].pro_certs || null);
        this.productForm.get('pro_price')?.setValue(data[0].pro_price || null);
        this.productForm.get('pro_image')?.setValue(data[0].pro_image || null);
        this.link_imagen_producto = String(data[0].pro_image); //usado para poner la imagen en un img
        this.productForm.get('pro_unit')?.setValue(data[0].pro_unit || null);
        this.productForm
          .get('pro_description')
          ?.setValue(data[0].pro_description || null);
        this.productForm
          .get('pro_status')
          ?.setValue(data[0].pro_status || null);
        this.productForm
          .get('providers_id')
          ?.setValue(data[0].providers_id || null);
        this.productForm
          .get('categories_id')
          ?.setValue(data[0].categories_id || null);
      } else {
        console.log('No hay datos guardados del producto.');
      }
    });
  }

  //para traer las categorias y luego mostrar en un select en html
  getCategories() {
    this.fkcategoryS.getCategory().subscribe((data) => {
      this.fkCategoryList = data;
    });
  }

  //Extraer el rol del usuario
  getRolUser() {
    const user_id: UserI = this.traerDatosSesion();
    this.rolUser = String(user_id.use_rol);
  }

  traerDatosSesion() {
    const requestData = sessionStorage.getItem('usuario_login');
    if (requestData) {
      return JSON.parse(requestData);
    }
  }
}
