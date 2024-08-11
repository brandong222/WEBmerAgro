import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { By } from '@angular/platform-browser';
import { PeopleI } from 'src/app/models/people.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  bandera_loading: boolean = true;


  constructor(private providerS: ProviderService,
    private route: Router,
    private peopleServide: PeopleService,
    private FK_joinS: JoinService ) { }

  providerArray: any[] = [];
  busqueda_clave = '';

  ngOnInit(): void {
  this.mostrarProvedores();
  }

  mostrarProvedores(){
  this.bandera_loading=  false;


  this.FK_joinS.getDataProvidersUser().subscribe(info=>{
    this.providerArray = info.data;
    this.providerArray.sort(() => Math.random() - 0.5);
  this.bandera_loading=  true;

   });
  }

  //BARRA DE BUSQUEDA
  barraBusquedaProductos(): void {
    if (!this.busqueda_clave.trim()) {
      this.mostrarProvedores();
      return;
    }
    this.providerArray = this.providerArray.filter((people) =>
      people.peo_name.toLowerCase().includes(this.busqueda_clave.toLowerCase())
    );
  }


//NAVEGACION

navEditarProveedor(id: number){
  if(id>0){
    this.route.navigate(['/provider/edit/'+id]);

  }else{
    alert('error')
    this.route.navigate(['/provider']);
  }
}


 }
