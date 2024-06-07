import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleService } from 'src/app/services/people/people.service';
import { PeopleI } from 'src/app/models/people.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { UserI } from 'src/app/models/user.interface';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css'],
})
export class PeopleEditComponent implements OnInit {
  peopleArray: superInterfazI[] = [];
  peopleForm: FormGroup;
  userForm: FormGroup;
  productForm: FormGroup;

  link_imagen_people: string = '';
  peopleIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  //variable para controlar nevegacion local
  navegacion_local: number = 1;
  banderaPassword: boolean = false;



  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private peopleS: PeopleService,
    private fkjoinS: JoinService,
    private userS: UserService
  ) {
    //section 1
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

    //section 2 userForm
    this.userForm = new FormGroup({
      id: new FormControl(0),
      use_cc: new FormControl('', Validators.required),
      use_password: new FormControl(''),
      use_rol: new FormControl('', Validators.required),
      use_status: new FormControl(1, Validators.required),
      people_id: new FormControl(0, Validators.required),
    });

    this.productForm = new FormGroup({
      id: new FormControl(0),
      pro_name:new FormControl('', Validators.required),
      pro_type: new FormControl('', Validators.required),
      pro_price: new FormControl(0),
      pro_certs: new FormControl('', Validators.required),
      pro_image:new FormControl(0),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status:new FormControl(0),
      providers_id: new FormControl(0),
      categories_id:new FormControl(0),
    });

  }

  ngOnInit(): void {
    this.datosPeople();
    this.mostrarDatosSesion();
  }

  //datos de persona section 1
  datosPeople() {
    //metodo para tomar los datos guardados y ponerlos en producto que se decea editar

    this.peopleS.getPersonById(this.peopleIdNumber).subscribe((data) => {
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
        Swal.fire('Productos', 'No hay persona registrada', 'error');
      }
    });
  }

  //section 2 datos sesion
  mostrarDatosSesion() {
    this.fkjoinS.joinUserPeopleID(Number(this.peopleIdNumber)).subscribe((data) => {

        if (data.data[0]) {
          const dataR: superInterfazI = data.data[0];

          this.userForm.get('id')?.setValue(Number(dataR.users_id));
          this.userForm.get('use_cc')?.setValue(dataR.use_cc || null);
          this.userForm.get('use_rol')?.setValue(dataR.use_rol || null);
          if(dataR.use_status == 1){
            this.userForm.get('use_status')?.setValue(dataR.use_status || null);
          }else{
            this.userForm.get('use_status')?.setValue(0);
          }

          this.userForm.get('people_id')?.setValue(dataR.users_id || null);


        } else {
          Swal.fire('Productos', 'No hay persona registrada', 'error');
        }

      });
  }

  //CONTROL DE MENU
  cambioMenuLocal(navega: number) {
    if (navega == 1) {
      this.navegacion_local = navega;
    }
    if (navega == 2) {
      this.navegacion_local = navega;
    }

    if (navega == 3) {
      this.navegacion_local = navega;
    }
  }

  //cambiar contraseña activar opciones
  cambiarPassword() {
    this.banderaPassword = !this.banderaPassword;
  }


//para controlar cambio de roles
rol_user_change(form: UserI){
const rol_user = form.use_rol;
alert(rol_user);
  if(rol_user == 'usuario'){

  }
  if(rol_user == 'productor'){

  }

  if(rol_user == 'admin'){

  }

  this.userForm.get('use_rol')?.setValue(rol_user);
}


  //guardar cambios (actualizar)

  actualizarPersona(form: PeopleI) {
    console.log(form);

    this.peopleS.updatePerson(Number(form.id), form).subscribe((data) => {
      alert(data.status);
      this.route.navigate(['/people']);
    });
  }

  //guardar cambios usuario
  actualizarUsuario(form: UserI){
    console.log(form);
    this.userS.updateUser(Number(form.id), form).subscribe(data=>{
      console.log(data.status);
      if(data.status){
        Swal.fire(
          'Usuario',
          'Datos actualizados exitosamente',
           'success'
               )
      }else{
        Swal.fire(
          'Usuario',
          'No se pudo actualizar los datos',
          'error'
        )
      }

      this.route.navigate(['/people/edit/'+this.peopleIdNumber]);
    })
  }

}
