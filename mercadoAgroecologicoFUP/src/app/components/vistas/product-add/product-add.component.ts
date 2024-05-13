import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImagenService } from 'src/app/services/subirIMAGEN/imagen.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductADDComponent implements OnInit {
  fkCategoryList: categoryI[] = [];
  selectedFile: File | null = null;
  public imageURL: string = 'API image';
  productForm: FormGroup;




  constructor(
    private productS: ProductService,
    private route: Router,
    private fkcategoryS: CategoryService,
    private imagenS: ImagenService
  ) {

    this.productForm = new FormGroup({
      pro_name: new FormControl('', Validators.required),
      pro_type: new FormControl('', Validators.required),
      pro_price: new FormControl( null,Validators.required),
      pro_certs: new FormControl('No', Validators.required),
      pro_image: new FormControl(''),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status: new FormControl(1, Validators.required),
      providers_id: new FormControl(null, Validators.required),
      categories_id: new FormControl(0 , Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }



  //para guardar imagen en la base datos y retornar su url
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
  }

  subirImagen(){
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.imagenS.uploadFile(this.selectedFile).subscribe((data) => {
        console.log(data.data);
        this.imageURL = data.data;
        this.productForm.get('peo_image')?.setValue(this.imageURL || '');
      });
    } else {
      alert('imagen no se pudo cargar');
    }
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
