import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requestapp-add',
  templateUrl: './requestapp-add.component.html',
  styleUrls: ['./requestapp-add.component.css']
})
export class RequestappADDComponent  implements OnInit{
  ngOnInit(): void {

  }

  tipoSolicitud: string = '';

  onTipoSolicitudChange(): void {
  }

}
