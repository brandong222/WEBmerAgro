import { Component, OnInit } from '@angular/core';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';
import { RequestI } from 'src/app/models/request.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { UserI } from 'src/app/models/user.interface';

@Component({
  selector: 'app-requestapp-add',
  templateUrl: './requestapp-add.component.html',
  styleUrls: ['./requestapp-add.component.css']
})
export class RequestappADDComponent  implements OnInit{
  requestArray: superInterfazI[] = [];

  constructor(
    private requestS: RequestappService,
    private fkjoinS: JoinService
  ) {

  }

  ngOnInit(): void {
  this.mostrarRequest();
  }

  mostrarRequest(){
    const request_id: RequestI = this.traerDatosSesion();
    const user_id: UserI = this.traerDatosSesion();

    this.fkjoinS.getjoinUserPeople(Number(user_id.id)).subscribe(data=>{
      console.log(data.data)
      this.requestArray = data.data;
    })
  }

  tipoSolicitud: string = '';

  onTipoSolicitudChange(): void {
  }

  traerDatosSesion(){
    const requestData = sessionStorage.getItem('usuario_login')
    if (requestData) {
      return JSON.parse(requestData)
    }
  }
}
