import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exheader',
  templateUrl: './exheader.component.html',
  styleUrls: ['./exheader.component.css']
})
export class ExheaderComponent {
  constructor(
    private route: Router
  ){

  }


  //navegacion

  navExtraHome(){
    this.route.navigate(['/extra/home'])
  }

  navExtraProduct(){
    this.route.navigate(['/extra/product'])
  }

  navExtraLogin(){
    this.route.navigate(['/login'])
  }

}
