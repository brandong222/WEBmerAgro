import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//modulos
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/vistas/home/home.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { ProductComponent } from './components/vistas/product/product.component';
import { MainComponent } from './components/vistas/main/main.component';
import { LoginComponent } from './components/vistas/login/login.component';
import { CategoryComponent } from './components/vistas/category/category.component';
import { CategoryADDComponent } from './components/vistas/category-add/category-add.component';
import { PeopleComponent } from './components/vistas/people/people.component';
import { PeopleADDComponent } from './components/vistas/people-add/people-add.component';
import { UserComponent } from './components/vistas/user/user.component';
import { UserADDComponent } from './components/vistas/user-add/user-add.component';
import { ProviderComponent } from './components/vistas/provider/provider.component';
import { ProviderADDComponent } from './components/vistas/provider-add/provider-add.component';
import { ProductADDComponent } from './components/vistas/product-add/product-add.component';
import { CertificationComponent } from './components/vistas/certification/certification.component';
import { RequestappComponent } from './components/vistas/requestapp/requestapp.component';
import { RequestappADDComponent } from './components/vistas/requestapp-add/requestapp-add.component';
import { CategoryEditComponent } from './components/vistas/category-edit/category-edit.component';
import { PeopleEditComponent } from './components/vistas/people-edit/people-edit.component';
import { ProductEditComponent } from './components/vistas/product-edit/product-edit.component';
import { ProviderEditComponent } from './components/vistas/provider-edit/provider-edit.component';
import { UserEditComponent } from './components/vistas/user-edit/user-edit.component';
import { ProductOWNComponent } from './components/vistas/product-own/product-own.component';
import { ProviderOWNComponent } from './components/vistas/provider-own/provider-own.component';
import { ProductSHOWComponent } from './components/vistas/product-show/product-show.component';
import { StarComponent } from './components/vistas/star/star.component';
import { RequestappEDITComponent } from './components/vistas/requestapp-edit/requestapp-edit.component';
import { PeopleSHOWComponent } from './components/vistas/people-show/people-show.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    MainComponent,
    LoginComponent,
    CategoryComponent,
    CategoryADDComponent,
    PeopleComponent,
    PeopleADDComponent,
    UserComponent,
    UserADDComponent,
    ProviderComponent,
    ProviderADDComponent,
    ProductADDComponent,
    CertificationComponent,
    RequestappComponent,
    RequestappADDComponent,
    CategoryEditComponent,
    PeopleEditComponent,
    ProductEditComponent,
    ProviderEditComponent,
    UserEditComponent,
    ProductOWNComponent,
    ProviderOWNComponent,
    ProductSHOWComponent,
    StarComponent,
    RequestappEDITComponent,
    PeopleSHOWComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
