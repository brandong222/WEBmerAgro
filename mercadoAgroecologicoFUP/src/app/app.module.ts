import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/sesion/login/login.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { ProductIndexComponent } from './components/product/product-index/product-index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserIndexComponent,
    ProductIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
