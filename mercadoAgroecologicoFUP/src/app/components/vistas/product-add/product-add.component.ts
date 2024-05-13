import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductADDComponent implements OnInit {
  fkCategoryList: categoryI[] = [];

  productForm = new FormGroup({
    pro_name: new FormControl('', Validators.required),
    pro_type: new FormControl('', Validators.required),
    pro_price: new FormControl( null,Validators.required),
    pro_certs: new FormControl('No', Validators.required),
    pro_image: new FormControl('', Validators.required),
    pro_unit: new FormControl('', Validators.required),
    pro_description: new FormControl('', Validators.required),
    pro_status: new FormControl(1, Validators.required),
    providers_id: new FormControl(null, Validators.required),
    categories_id: new FormControl(0 , Validators.required),
  });


  constructor(
    private productS: ProductService,
    private route: Router,
    private fkcategoryS: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  //para traer las categorias y luego mostrar en un select en html
  getCategories() {
    this.fkcategoryS.getCategory().subscribe((data) => {
      this.fkCategoryList = data;
    });
  }

  guardarProducto(form: ProductI) {
    const numericCategoriesId = Number(form.categories_id);

    // Actualizar el valor de categories_id en el formulario
    this.productForm.patchValue({
      categories_id: numericCategoriesId
    });

    // Ahora, puedes enviar el formulario actualizado
    console.log(this.productForm.value);
    this.productS.addProduct(this.productForm.value).subscribe((data) => {
      console.log(data);
    });
  }
}
