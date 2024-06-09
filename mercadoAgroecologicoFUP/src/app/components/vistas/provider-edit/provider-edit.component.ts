import { Component, OnInit, Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { PeopleI } from 'src/app/models/people.interface';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css'],
})
export class ProviderEditComponent  implements OnInit{
  providerForm: FormGroup;
  peopleForm: FormGroup;

  link_imagen_people: string = '';
  valor_ranking_start: number =0;
  //tomar id de las rutas
  providerIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private providerS: ProviderService,
    private fkjoinS: JoinService,
    private peopleS: PeopleService,
    )
     {
    this.providerForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      prov_ranking: new FormControl(0, Validators.required),
      prov_group: new FormControl('', Validators.required),
      prov_description: new FormControl('', Validators.required),
      prov_status: new FormControl(0, Validators.required),
      people_peo_id: new FormControl(0, Validators.required),
    });


    this.peopleForm = new FormGroup({
      id: new FormControl('', Validators.required),
      peo_name: new FormControl('', Validators.required),
      peo_lastName: new FormControl('', Validators.required),
      peo_adress: new FormControl('', Validators.required),
      peo_dateBirth: new FormControl(null),
      peo_image: new FormControl('', Validators.required),
      peo_mail: new FormControl('', Validators.required),
      peo_phone: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
  this.datosProductoId();
  }

  datosPersonaID(id_people: number){
  this.peopleS.getPersonById(id_people).subscribe(data=>{
    if (data) {
      const dataR: PeopleI = data.data;

      this.peopleForm.get('id')?.setValue(Number(dataR.id));
      this.peopleForm.get('peo_name')?.setValue(dataR.peo_name || null);
      this.peopleForm
        .get('peo_lastName')
        ?.setValue(dataR.peo_lastname || null);
      this.peopleForm.get('peo_adress')?.setValue(dataR.peo_adress || null);
      this.peopleForm
        .get('peo_dateBirth')
        ?.setValue(dataR.peo_dateBirth || null);
      this.peopleForm.get('peo_image')?.setValue(dataR.peo_image || null);
      this.link_imagen_people = String(dataR.peo_image); //usado para poner la imagen en un img
      this.peopleForm.get('peo_mail')?.setValue(dataR.peo_mail || null);
      this.peopleForm.get('peo_phone')?.setValue(dataR.peo_phone || null);
    } else {

    }
  })

  }


  datosProductoId() {
    console.log(this.providerIdNumber);
    this.providerS.getProviderId(this.providerIdNumber).subscribe((data) => {
      if (data) {
        console.log(data.data);
        const dataR: ProviderI = data.data;
        this.providerForm.get('id')?.setValue(Number(dataR.id));
        this.providerForm.get('prov_ranking')?.setValue(dataR.prov_ranking || null);
        this.valor_ranking_start = Number(dataR.prov_ranking);
        this.providerForm.get('prov_group')?.setValue(dataR.prov_group || null);
        this.providerForm.get('prov_description')?.setValue(dataR.prov_description || null);
        this.providerForm.get('prov_status')?.setValue(dataR.prov_status || null);
        this.providerForm.get('people_peo_id')?.setValue(dataR.people_peo_id || null);

        this.datosPersonaID(Number(dataR.people_peo_id));
      } else {
        console.log('No hay datos guardados del producto.');
    }
    });
  }
}
