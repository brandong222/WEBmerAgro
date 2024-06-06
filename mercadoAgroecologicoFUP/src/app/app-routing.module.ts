import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/vistas/login/login.component';
import { ProductComponent } from './components/vistas/product/product.component';
import { HomeComponent } from './components/vistas/home/home.component';
import { MainComponent } from './components/vistas/main/main.component';
import { CategoryComponent } from './components/vistas/category/category.component';
import { CategoryADDComponent } from './components/vistas/category-add/category-add.component';

//guardian de rutas
import { AuthGuard } from './services/login/auth.guard'; // guardian de rutas

import { ProductADDComponent } from './components/vistas/product-add/product-add.component';
import { ProviderComponent } from './components/vistas/provider/provider.component';
import { ProviderADDComponent } from './components/vistas/provider-add/provider-add.component';
import { UserComponent } from './components/vistas/user/user.component';
import { UserADDComponent } from './components/vistas/user-add/user-add.component';
import { PeopleADDComponent } from './components/vistas/people-add/people-add.component';
import { PeopleComponent } from './components/vistas/people/people.component';
import { RequestappComponent } from './components/vistas/requestapp/requestapp.component';
import { RequestappADDComponent } from './components/vistas/requestapp-add/requestapp-add.component';
import { RequestappEDITComponent } from './components/vistas/requestapp-edit/requestapp-edit.component';
import { UserEditComponent } from './components/vistas/user-edit/user-edit.component';
import { ProductEditComponent } from './components/vistas/product-edit/product-edit.component';
import { CategoryEditComponent } from './components/vistas/category-edit/category-edit.component';
import { ProviderEditComponent } from './components/vistas/provider-edit/provider-edit.component';
import { ProductOWNComponent } from './components/vistas/product-own/product-own.component';
import { ProviderOWNComponent } from './components/vistas/provider-own/provider-own.component';
import { ProductSHOWComponent } from './components/vistas/product-show/product-show.component';
import { PeopleEditComponent } from './components/vistas/people-edit/people-edit.component';
import { StarComponent } from './components/vistas/star/star.component';
import { PeopleSHOWComponent } from './components/vistas/people-show/people-show.component';
import { UserLISTComponent } from './components/vistas/user-list/user-list.component';


const routes: Routes = [
  {path: "" , component: MainComponent},
  {path: "login" , component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},

  {path: "user" , component: UserComponent},
  {path: "user/add/:id" , component: UserADDComponent},
  {path: "user/edit" , component: UserEditComponent},
  {path: "user/list" , component: UserLISTComponent},




  {path: 'product', component: ProductComponent,canActivate:[AuthGuard]},
  {path: 'product/add', component: ProductADDComponent,canActivate:[AuthGuard]},
  {path: 'product/edit/:id', component: ProductEditComponent,canActivate:[AuthGuard]},
  {path: 'product/own', component: ProductOWNComponent,canActivate:[AuthGuard]},
  {path: 'product/show/:id', component: ProductSHOWComponent,canActivate:[AuthGuard]},


  {path: 'request/edit/:id', component: RequestappEDITComponent, canActivate:[AuthGuard]},
  {path: 'request', component: RequestappComponent,canActivate:[AuthGuard]},
  {path: 'request/add', component: RequestappADDComponent,canActivate:[AuthGuard]},


  {path: 'category', component: CategoryComponent, canActivate:[AuthGuard]},
  {path: 'category/add', component: CategoryADDComponent, canActivate:[AuthGuard]},
  {path: 'category/edit/:id', component: CategoryEditComponent, canActivate:[AuthGuard]},


  {path: 'people', component: PeopleComponent, canActivate:[AuthGuard]},
  {path: 'people/add', component: PeopleADDComponent},
  {path: 'people/edit/:id', component: PeopleEditComponent, canActivate:[AuthGuard]},
  {path: 'people/show/:id', component: PeopleSHOWComponent, canActivate:[AuthGuard]},



  {path: 'provider', component: ProviderComponent, canActivate:[AuthGuard]},
  {path: 'provider/add', component: ProviderADDComponent, canActivate:[AuthGuard]},
  {path: 'provider/edit/:id', component: ProviderEditComponent, canActivate:[AuthGuard]},
  {path: 'provider/own', component: ProviderOWNComponent, canActivate:[AuthGuard]},

  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
