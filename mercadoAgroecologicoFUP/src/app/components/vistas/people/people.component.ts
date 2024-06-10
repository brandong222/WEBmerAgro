import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  peopleForm: FormGroup;
  link_imagen_people: string = "";
bandera_edit_people: boolean = false;

  constructor(
    private route: Router,
    private peopleS: PeopleService,
    private fkjoinS: JoinService
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
  }

  ngOnInit(): void {

    this.mostrarPeople();
  }


  mostrarPeople(){
    const user_id: UserI = this.traerDatosSesion();
    this.fkjoinS.getjoinUserPeople(Number(user_id.id)).subscribe(data=>{
      console.log(data.data[0].people_id);
      this.peopleForm.get('id')?.setValue(Number(data.data[0].people_id));
      this.peopleForm.get('peo_name')?.setValue(data.data[0].peo_name);
      this.peopleForm.get('peo_lastName')?.setValue(data.data[0].peo_lastname);
      this.peopleForm.get('peo_adress')?.setValue(data.data[0].peo_adress);
      this.peopleForm.get('peo_dateBirth')?.setValue(data.data[0].peo_dateBirth);
      this.peopleForm.get('peo_image')?.setValue(data.data[0].peo_image);
      this.link_imagen_people = String(data.data[0].peo_image);
      this.peopleForm.get('peo_mail')?.setValue(data.data[0].peo_mail);
      this.peopleForm.get('peo_phone')?.setValue(data.data[0].peo_phone);



    })
  }



  traerDatosSesion(){
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }




// controles para cambio de rol
activarControlProductor(people_id: number){

}


//para activar la ediccion
habilitarEditPeople(){

this.bandera_edit_people = !this.bandera_edit_people;

}




guardarDatosPeople(form: PeopleI){
 console.log(form)
 this.bandera_edit_people = !this.bandera_edit_people;
}



  //NAVEGACION

  //ver datos de sesion
  navDatosSesion(){
    this.route.navigate(['/user/']);
  }


  navDatosProveedor(){
    this.route.navigate(['/provider/own'])
  }



}
