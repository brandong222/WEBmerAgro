import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestI } from 'src/app/models/request.interface';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';

@Component({
  selector: 'app-requestapp',
  templateUrl: './requestapp.component.html',
  styleUrls: ['./requestapp.component.css'],
})
export class RequestappComponent implements OnInit {
  constructor(private requestS: RequestappService, private route: Router) {}

  requestArray: RequestI[] = [];

  ngOnInit(): void {
    this.requestS.getRequestapp().subscribe((data) => {
      console.log(data);
      this.requestArray = data;
    });
  }
}
