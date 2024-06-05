import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requestapp-edit',
  templateUrl: './requestapp-edit.component.html',
  styleUrls: ['./requestapp-edit.component.css']
})
export class RequestappEDITComponent {

    constructor(
      private route: Router,
    ){}

  //NAvegacion
  nvRegresar(){
    this.route.navigate(['/request']);
  }

}
