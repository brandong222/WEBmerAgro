import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people/people.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleI } from 'src/app/models/people.interface';
import { responsiveI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.css'],
})
export class PeopleADDComponent {

  constructor(private route: Router, private peopleS: PeopleService) {}

  peopleForm = new FormGroup({
    peo_name: new FormControl('', Validators.required),
    peo_lastName: new FormControl('', Validators.required),
    peo_adress: new FormControl('', Validators.required),
    peo_dateBirth: new FormControl('', Validators.required),
    peo_image: new FormControl('', Validators.required),
    peo_mail: new FormControl('', Validators.required),
    peo_phone: new FormControl('', Validators.required)

  });


  //guardar en db una persona

  guardarPersona(form: PeopleI){

   console.log(form);
    this.peopleS.addPeople(form).subscribe(
      (data) => {
        let dataR: responsiveI = data;

        if (dataR.status) {
         console.log('se guardo');
         this.route.navigate(['/user/add/',dataR.data.id]);
        }
      },
      (error) => {
        // Aquí manejas el error alertas
        alert('no se guardo');
      }
    );

  }





  //navegation

  navegateToRegresar() {
    this.route.navigate(['/']);
  }
}
