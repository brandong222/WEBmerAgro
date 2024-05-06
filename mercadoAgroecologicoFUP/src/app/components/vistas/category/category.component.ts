import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { categoryI } from 'src/app/models/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  categories: categoryI[] =[];
  constructor(private categoryS: CategoryService, private route: Router) {}

  ngOnInit() {
    this.categoryS.getCategory().subscribe((data) => {
      this.categories = data;
      console.log(data);
    });
  }

  editarCategory(id:any){
  //  this.route.navigate(['category/add', id]);
  }

  agregarCategory(){
    this.route.navigate(['category/add']);
  }


}
