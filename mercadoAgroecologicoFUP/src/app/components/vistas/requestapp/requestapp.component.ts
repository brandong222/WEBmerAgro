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
    private FK_joinS: JoinService) { }

  requestArray: any[] = [];
  filteredRequests: any[] = [];
  //variable para controlar nevegacion local
  navegacion_local: number = 1;

  ngOnInit(): void {
    this.datosUnidos();
  }

  datosUnidos() {
    this.FK_joinS.showReqPeoUsu().subscribe((info) => {
      this.requestArray = info.data;
      console.log(info)

      this.cambioMenuLocal(this.navegacion_local);
    });
  }

  cambioMenuLocal(navega: number) {
    this.navegacion_local = navega;
    let filterCondition: string;

    switch (navega) {
      case 1:
        filterCondition = 'Certificar producto (s)';
        this.filtroSolicitudes(filterCondition);
        break;
      case 2:
        filterCondition = 'Ser productor';
        this.filtroSolicitudes(filterCondition);
        break;
      case 3:
        filterCondition = 'Contraseña';
        this.filtroSolicitudes(filterCondition);
        break;
      default:
        return;
    }
  }

  filtroSolicitudes(filter: string) {
    this.filteredRequests = this.requestArray.filter(item => item.req_type === filter);
  }

  //NAVEGAR

  nvEditRequest(id_request: number) {
    this.route.navigate(['/request/edit/' + id_request]);
  }



}
