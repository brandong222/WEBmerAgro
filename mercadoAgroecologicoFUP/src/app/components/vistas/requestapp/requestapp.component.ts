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

  ngOnInit(): void {
       this.datosUnidos();
  }

  datosUnidos(){
    this.FK_joinS.showReqPeoUsu().subscribe((info) => {
      console.log(info.status);
      console.log(info);
      this.requestArray = info.data;
    });
  }
}
