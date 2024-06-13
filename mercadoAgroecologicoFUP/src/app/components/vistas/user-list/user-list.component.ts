import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserI } from '../../../models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleI } from '../../../models/people.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserLISTComponent implements OnInit{


  userArray:  any[] = [];


constructor(
  private userS: UserService,
  private route: Router,
  private fkjoinS: JoinService,

){

}

  ngOnInit(): void {
    this.mostrarUsuarios();
  }



  mostrarUsuarios(){
    this.fkjoinS.showPeopleUsers().subscribe(data=>{
    this.userArray = data;
    })
  }


  //NAVEGACION
  navPerfilPeople(id_people: number){
    this.route.navigate(['/people/edit/'+id_people]);
  }




}
