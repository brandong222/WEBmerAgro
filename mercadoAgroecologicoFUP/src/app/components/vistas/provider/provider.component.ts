import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { By } from '@angular/platform-browser';
import { PeopleI } from 'src/app/models/people.interface';
import { JoinService } from 'src/app/services/join/join.service';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private providerS: ProviderService,
    private route: Router,
    private peopleServide: PeopleService,
    private FK_joinS: JoinService ) { }

  providerArray: any[] = [];

  ngOnInit(): void {
  this.datosUnidos();
  }

  datosUnidos(){
  this.FK_joinS.getDataProvidersUser().subscribe(info=>{
    console.log(info.status);
    console.log(info.data);
    this.providerArray = info.data;
   });
  }
 }
