import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
   }

   navigateToRegister(){
    this.router.navigate(['/']);
   }


}