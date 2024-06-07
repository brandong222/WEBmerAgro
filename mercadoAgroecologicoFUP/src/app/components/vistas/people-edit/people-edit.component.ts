import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/services/people/people.service';
import { PeopleI } from 'src/app/models/people.interface';


@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css']
})
export class PeopleEditComponent implements OnInit{

  peopleArray: superInterfazI[] = [];
  peopleForm: FormGroup;
  link_imagen_people:string = ""
  peopleIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  //variable para controlar nevegacion local
  navegacion_local: number = 1;

  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private peopleS: PeopleService,
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


  datosPeople() {
    //metodo para tomar los datos guardados y ponerlos en producto que se decea editar

    this.peopleS.getPersonById(this.peopleIdNumber).subscribe((data) => {
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
        console.log('No hay datos guardados del producto.');
      }
    });
  }


//CONTROL DE MENU
cambioMenuLocal(navega: number){
  if (navega == 1) {
  this.navegacion_local = navega;
  }
  if (navega == 2){
    this.navegacion_local = navega;
  }

  if (navega == 3){
    this.navegacion_local = navega;
  }
}


  ngOnInit(): void {
  this.datosPeople();
  }

  //guardar cambios (actualizar)

  actualizarPersona(form: PeopleI) {
    console.log(form);

    this.peopleS.updatePerson(Number(form.id), form).subscribe(data=>{
      localStorage.setItem('user_name', String(form.peo_name));
      alert(data.status)
      this.route.navigate(['/people']);

    })
  }

}
