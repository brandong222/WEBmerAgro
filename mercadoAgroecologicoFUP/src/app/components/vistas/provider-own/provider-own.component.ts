import { Component, OnInit } from '@angular/core';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';

@Component({
  selector: 'app-provider-own',
  templateUrl: './provider-own.component.html',
  styleUrls: ['./provider-own.component.css']
})
export class ProviderOWNComponent implements OnInit {

  providerArray: any[] = [];

  constructor(private fpkjoinS: JoinService){

  }


ngOnInit(): void {
this.mostrarInforProvedor();

}


mostrarInforProvedor(){
  const sesion: UserI = this.traerDatosSesion();

  this.fpkjoinS.joinProvedorpeopleID(Number(sesion.people_id)).subscribe(data=>{
    console.log(data.data[0])
    this.providerArray = data.data;
  })
}


traerDatosSesion(){
  const usuarioData = sessionStorage.getItem('usuario_login');

  if (usuarioData) {
    return JSON.parse(usuarioData);
  }
}

}
