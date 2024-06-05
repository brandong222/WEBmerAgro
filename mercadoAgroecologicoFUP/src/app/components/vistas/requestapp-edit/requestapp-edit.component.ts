import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';


@Component({
  selector: 'app-requestapp-edit',
  templateUrl: './requestapp-edit.component.html',
  styleUrls: ['./requestapp-edit.component.css']
})
export class RequestappEDITComponent {

  peopleArray: superInterfazI[] = [];
  peopleForm: FormGroup;
  link_imagen_people:string = ""
  id_productor_ruta: number = Number(this.routeA.snapshot.paramMap.get('id'));
  id_people_fk: number = 0;


  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private peopleS: PeopleService,
    private fkjoinS: JoinService,
    private providerS: ProviderService,
    private productS: ProductService,
    private requestS: RequestappService,

  ){
    this.peopleForm = new FormGroup({
      id: new FormControl('', Validators.required),
      peo_name: new FormControl('', Validators.required),
      peo_lastName: new FormControl("", Validators.required),
      peo_adress: new FormControl('', Validators.required),
      peo_dateBirth: new FormControl(null),
      peo_image: new FormControl('', Validators.required),
      peo_mail: new FormControl('', Validators.required),
      peo_phone: new FormControl(0, Validators.required),
    });

  }

  //obtener id de people
  obtenerPeopleID(){
    this.requestS.getRequestAppId(this.id_productor_ruta).subscribe(data=>{
  //traer id de la persona
     // this.requestS.getRequestAppId(Number(data[0].people_peo_id)).subscribe(datos=>{
        //console.log(datos.data.people_peo_id);
      //this.id_people_fk = datos.data.people_peo_id;
      //metodo para buscar datos

      //})
    });
  }


  datosPeople() {
    //metodo para tomar los datos guardados y ponerlos en producto que se decea editar

    this.peopleS.getPersonById(this.id_people_fk).subscribe((data) => {
      if (data) {
        const dataR: PeopleI = data.data;

       this.peopleForm.get('id')?.setValue(Number(dataR.id));
        this.peopleForm.get('peo_name')?.setValue(dataR.peo_name || null);
        this.peopleForm.get('peo_lastName')?.setValue(dataR.peo_lastname || null);
        this.peopleForm.get('peo_adress')?.setValue(dataR.peo_adress || null);
        this.peopleForm.get('peo_dateBirth')?.setValue(dataR.peo_dateBirth || null);
        this.peopleForm.get('peo_image')?.setValue(dataR.peo_image || null);
        this.link_imagen_people = String(dataR.peo_image); //usado para poner la imagen en un img
        this.peopleForm.get('peo_mail')?.setValue(dataR.peo_mail || null);
        this.peopleForm.get('peo_phone')?.setValue(dataR.peo_phone || null);

      } else {
        console.log('No hay datos guardados del productor.');
      }
    });
  }

  ngOnInit(): void {
  this.obtenerPeopleID();
  }

  //NAvegacion
  nvRegresar(){
    this.route.navigate(['/request']);
  }

}
