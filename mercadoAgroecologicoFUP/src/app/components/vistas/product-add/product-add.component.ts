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
  productForm: FormGroup;
  fkCategoryList: categoryI[] = [];

  constructor(
    private productS: ProductService,
    private route: Router,
    private fkcategoryS: CategoryService
  ) {
    this.productForm = new FormGroup({
      pro_name: new FormControl('', Validators.required),
      pro_type: new FormControl('', Validators.required),
      pro_price: new FormControl('', Validators.required),
      pro_certs: new FormControl('', Validators.required),
      pro_image: new FormControl(''),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status: new FormControl(1, Validators.required),
      provider_id: new FormControl(1, Validators.required),
      categories_id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  //para traer las categorias y luego mostrar en un select en html
  getCategories() {
    this.fkcategoryS.getCategory().subscribe((data) => {
      console.log(data);
      this.fkCategoryList = data;
    });
  }

  guardarProducto(form: ProductI) {
    this.productS.addProduct(form).subscribe((data) => {
      console.log(data.message);
      console.log(data.status);
    });
  }
}
