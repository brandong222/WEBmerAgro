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
import { ProductADDComponent } from './components/vistas/product-add/product-add.component';
import { ProviderComponent } from './components/vistas/provider/provider.component';
import { ProviderADDComponent } from './components/vistas/provider-add/provider-add.component';
import { UserComponent } from './components/vistas/user/user.component';
import { UserADDComponent } from './components/vistas/user-add/user-add.component';


const routes: Routes = [
  {path: "" , component: MainComponent},
  {path: "login" , component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},

  {path: "user" , component: UserComponent},
  {path: "user/add" , component: UserADDComponent},

  {path: 'product', component: ProductComponent,canActivate:[AuthGuard]},
  {path: 'product/add', component: ProductADDComponent,canActivate:[AuthGuard]},

  {path: 'category', component: CategoryComponent, canActivate:[AuthGuard]},
  {path: 'category/add', component: CategoryADDComponent, canActivate:[AuthGuard]},

  {path: 'people', component: CategoryComponent, canActivate:[AuthGuard]},
  {path: 'people/add', component: CategoryADDComponent, canActivate:[AuthGuard]},

  {path: 'provider', component: ProviderComponent, canActivate:[AuthGuard]},
  {path: 'provider/add', component: ProviderADDComponent, canActivate:[AuthGuard]},

  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
