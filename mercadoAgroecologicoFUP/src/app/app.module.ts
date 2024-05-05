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





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    MainComponent,
    LoginComponent,
    CategoryComponent
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
