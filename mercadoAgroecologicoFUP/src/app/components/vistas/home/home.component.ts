import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor( private route: Router) {}



  ngOnInit(): void {
    const token = localStorage.getItem('token');




    if(token){

    }else{
      this.route.navigate(['']);
    }
  }

}
