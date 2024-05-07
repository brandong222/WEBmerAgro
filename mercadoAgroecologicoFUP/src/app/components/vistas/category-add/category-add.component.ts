import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/app/models/category.interface';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryADDComponent {

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
