import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';
import { Location } from '@angular/common';
import { RequestI } from 'src/app/models/request.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestapp-edit',
  templateUrl: './requestapp-edit.component.html',
  styleUrls: ['./requestapp-edit.component.css'],
})
export class RequestappEDITComponent {
  peopleArray: superInterfazI[] = [];
  providerArray: any[] = [];
  requestArray: any[] = [];
  peopleForm: FormGroup;
  requestForm: FormGroup;
  link_imagen_people: string = '';
  id_ruta_request: number = Number(this.routeA.snapshot.paramMap.get('id'));
  id_people_fk: number = 0;
  people_phone: string = '';
  people_name: string = '';
  type_request: string = '';
  request_status: number = 0;

  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private peopleS: PeopleService,
    private fkjoinS: JoinService,
    private requestS: RequestappService,
    private location: Location
  ) {
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

    this.requestForm = new FormGroup({
      id: new FormControl(this.id_ruta_request, Validators.required),
      req_dateRequest: new FormControl('', Validators.required),
      req_type: new FormControl('', Validators.required),
      req_description: new FormControl('', Validators.required),
      req_status: new FormControl(0, Validators.required),
      people_id: new FormControl(0, Validators.required),
    });
  }

  //obtener id de people
  obtenerPeopleID() {
    this.requestS.getRequestAppId(this.id_ruta_request).subscribe((data) => {
      this.id_people_fk = data.data.people_id;
      //metodo para buscar datos
      this.datosPeople();
      this.mostrarProvedores();
      this.datosUnidos();
      this.buscarTipoRespuesta();
    });
  }

  datosPeople() {
    //metodo para tomar los datos guardados y ponerlos en producto que se decea editar

    this.peopleS.getPersonById(this.id_people_fk).subscribe((data) => {
      console.log(data)
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

        this.people_phone = String(dataR.peo_phone);
        this.people_name = String(dataR.peo_name);
      } else {
        console.log('No hay datos guardados del productor.');
      }
    });
  }

  ngOnInit(): void {
    this.obtenerPeopleID();
    this.buscarTipoRespuesta();
  }

  mostrarProvedores() {
     this.fkjoinS.joinProvedorpeopleID(this.id_people_fk).subscribe(info => {
      this.providerArray = info.data;
    });
  }

  datosUnidos() {
    this.fkjoinS.getjoinReqPeoUsu(this.id_people_fk).subscribe((info) => {
      this.requestArray = info.data;
    });
  }

  buscarTipoRespuesta(){
    this.requestS.getRequestAppId(this.id_ruta_request).subscribe((info) => {
      console.log(info,"datos request")
      this.requestForm.get('req_dateRequest')?.setValue(info.data.req_dateRequest || null);
      this.requestForm.get('req_type')?.setValue(info.data.req_type || null);
      this.requestForm.get('req_description')?.setValue(info.data.req_description);
      this.requestForm.get('people_id')?.setValue(info.data.people_id || null);
      this.requestForm.get('req_status')?.setValue(info.data.req_status || null);
      this.type_request = info.data.req_type;
    });
  }

  //para controlar cambio de roles
  evaluar_estado_respuesta(form: RequestI) {
    const status_req: number = Number(form.req_status);
    Swal.fire('Estado de la solisitud','se cambio el estado de la solicitud','success')

    if (status_req == 1) {
      this.request_status = 1;
    }
    if (status_req == 2) {
      this.request_status = 2;
    }
    if (status_req == 3) {
      this.request_status = 3;
    }
    if (status_req == 4) {
      this.request_status = 4;
    }
    this.requestS.updateRequestApp(this.id_ruta_request,form).subscribe(data=>{
      console.log(data)
    })
  }

  //Navegacion
  navEditarProveedor(id: number) {
    if (id > 0) {
      this.route.navigate(['/provider/edit/' + id]);

    } else {
      alert('error')
      this.route.navigate(['/provider']);
    }
  }

  navPerfilPeople(id_people: number){
    this.route.navigate(['/people/edit/'+id_people]);
  }

   //regresar
   nvRegresar() {
    this.location.back();
  }
}
