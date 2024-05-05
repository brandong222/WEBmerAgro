import { categoryI } from './../../../models/category.interface';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

    CategoryForm = new FormGroup({
      cat_name: new FormControl('', Validators.required),
      cat_description: new FormControl('', Validators.required),
      cat_image: new FormControl('', Validators.required),

    });

  constructor(private categoryS: CategoryService){}

  GuardarCategory(form: categoryI) {
    this.categoryS.AddCategory(form).subscribe((data) => {
      console.log(data);
    });
  }

}
