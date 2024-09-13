import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from 'src/app/services/login/auth-token.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor( private route: Router,
    private authS: AuthTokenService
  ) {}



  ngOnInit(): void {
    this.validarSesionActiva()
  }

  validarSesionActiva(){
    var token = localStorage.getItem('token');
    if(token){
    this.authS.verTokenVencido(token).subscribe(data=>{
      if(data.status){
        alert(data.status)


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

}
