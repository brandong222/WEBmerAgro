import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { By } from '@angular/platform-browser';
import { PeopleI } from 'src/app/models/people.interface';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private providerS: ProviderService, private route: Router, private peopleServide: PeopleService  ) { }

  providerArray: ProviderI[] = [];
  peopleData: PeopleI[] = [];

  ngOnInit(): void {
    this.providerS.getProvider().subscribe(data => {
      console.log(data);
      this.providerArray = data;
    });
    this.peopleServide.getPeople().subscribe(peopleData => {
      // Asumiendo que peopleData es un array de personas
      this.peopleData = peopleData.map(persona => {
        // Buscar el proveedor correspondiente por people_id
        const provider = this.providerArray.find(p => p.people_peo_id === persona.id);
        // Devolver un nuevo objeto que incluya la descripción del proveedor
        return {...persona, prov_description: provider? provider.prov_description : 'Descripción no disponible'};
      });
    });
  }
}
