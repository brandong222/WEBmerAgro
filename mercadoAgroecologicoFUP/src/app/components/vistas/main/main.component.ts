import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/services/login/auth-token.service';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(
    private route: Router,
    private authS: AuthTokenService,

  ) { }


  //navegacion
  navigateToLogin() {

  var token = localStorage.getItem('token');
  if(token){
  this.authS.verTokenVencido(token).subscribe(data=>{
    if(data.status){
      this.route.navigate(['/home']);

    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('user_name');
      localStorage.removeItem('id_user');
      sessionStorage.removeItem('usuario_login');
      this.route.navigate(['']);

    }
  })

  }else{
    this.route.navigate(['/login']);

  }



   }

   navigateToRegister(){
    this.route.navigate(['/people/add']);
   }
}
