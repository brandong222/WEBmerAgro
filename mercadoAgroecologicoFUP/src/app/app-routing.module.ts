import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/vistas/login/login.component';
import { ProductComponent } from './components/vistas/product/product.component';
import { HomeComponent } from './components/vistas/home/home.component';
import { MainComponent } from './components/vistas/main/main.component';
import { CategoryComponent } from './components/vistas/category/category.component';

const routes: Routes = [
  {path: "" , component: MainComponent},
  {path: "login" , component: LoginComponent},
  {path: 'product', component: ProductComponent},
  {path: 'home', component: HomeComponent},
  {path: 'category', component: CategoryComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
