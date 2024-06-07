import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestI } from 'src/app/models/request.interface';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';
import { JoinService } from 'src/app/services/join/join.service';

@Component({
  selector: 'app-requestapp',
  templateUrl: './requestapp.component.html',
  styleUrls: ['./requestapp.component.css'],
})
export class RequestappComponent implements OnInit {
  constructor(private requestS: RequestappService,
    private route: Router,
    private FK_joinS: JoinService ) {}

  requestArray: any[] = [];
  filteredRequests: any[] = [];
    //variable para controlar nevegacion local
  navegacion_local: number = 1;

  ngOnInit(): void {
       this.datosUnidos();
       this.cambioMenuLocal(1);
  }

  datosUnidos(){
    this.FK_joinS.showReqPeoUsu().subscribe((info) => {
      console.log(info.status);
      console.log(info);
      this.requestArray = info.data;
    });
  }

  cambioMenuLocal(navega: number){
    if (navega == 1) {
    this.navegacion_local = navega;
    this.filteredRequests = this.requestArray.filter(item => item.req_type === 'Certificar producto (s)');
    }
    if (navega == 2){
      this.navegacion_local = navega;
      this.filteredRequests = this.requestArray.filter(item => item.req_type === 'Ser productor');
    }

    if (navega == 3){
      this.navegacion_local = navega;
      this.filteredRequests = this.requestArray.filter(item => item.req_type === 'Contraseña');
    }
  }


  //NAVEGAR

  nvEditRequest(id_provedor: number){
  this.route.navigate(['/request/edit/'+id_provedor]);
  }

}
