import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/vistas/login/login.component';
import { ProductComponent } from './components/vistas/product/product.component';
import { HomeComponent } from './components/vistas/home/home.component';
import { MainComponent } from './components/vistas/main/main.component';
import { CategoryComponent } from './components/vistas/category/category.component';
import { CategoryADDComponent } from './components/vistas/category-add/category-add.component';

//guardian de rutas
import { AuthGuard } from './services/login/auth.guard'; // Asegúrate de importar tu AuthGuard


const routes: Routes = [
  {path: "" , component: MainComponent},
  {path: "login" , component: LoginComponent},
  {path: 'product', component: ProductComponent,canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'category', component: CategoryComponent, canActivate:[AuthGuard]},
  {path: 'category/add', component: CategoryADDComponent, canActivate:[AuthGuard]},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
