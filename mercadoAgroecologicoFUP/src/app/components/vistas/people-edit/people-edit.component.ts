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
import { ProviderService } from 'src/app/services/provider/provider.service';
import { ProviderI } from 'src/app/models/provider.interface';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.css'],
})
export class PeopleEditComponent implements OnInit {
  //validar si es administrador

  bandera_sesion_rol: boolean = false;

  peopleArray: superInterfazI[] = [];
  peopleForm: FormGroup;
  userForm: FormGroup;
  productForm: FormGroup;
  providerForm: FormGroup;

  rol_people_general: string = 'usuario';
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
    private userS: UserService,
    private providerS: ProviderService
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
      pro_name: new FormControl('', Validators.required),
      pro_type: new FormControl('', Validators.required),
      pro_price: new FormControl(0),
      pro_certs: new FormControl('', Validators.required),
      pro_image: new FormControl(0),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status: new FormControl(0),
      providers_id: new FormControl(0),
      categories_id: new FormControl(0),
    });

    this.providerForm = new FormGroup({
      id: new FormControl(null),
      prov_ranking: new FormControl(0),
      prov_group: new FormControl('', Validators.required),
      prov_description: new FormControl('', Validators.required),
      prov_status: new FormControl(1),
      people_peo_id: new FormControl(Number(this.peopleIdNumber)),
    });
  }

  ngOnInit(): void {
    const sesion: UserI = this.traerDatosSesion();
    if(sesion.use_rol === 'admin'){
      this.bandera_sesion_rol = true;
    }
    this.datosPeople();
    this.mostrarDatosSesion();
    this.mostrarDatosProveedor();
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

      }
    });
  }

  //section 2 datos sesion
  mostrarDatosSesion() {
    this.fkjoinS
      .joinUserPeopleID(Number(this.peopleIdNumber))
      .subscribe((data) => {
        if (data.data[0]) {
          const dataR: superInterfazI = data.data[0];

          this.userForm.get('id')?.setValue(Number(dataR.users_id));
          this.userForm.get('use_cc')?.setValue(dataR.use_cc || null);
          this.userForm.get('use_rol')?.setValue(dataR.use_rol || null);
          //pasar rol para controlar formulario
          this.rol_people_general = dataR.use_rol;

          if (dataR.use_status == 1) {
            this.userForm.get('use_status')?.setValue(dataR.use_status || null);
          } else {
            this.userForm.get('use_status')?.setValue(0);
          }

          this.userForm.get('people_id')?.setValue(dataR.users_id || null);
        } else {

        }
      });
  }

  //section 2 mostrar datos de provedor
  mostrarDatosProveedor() {
    this.fkjoinS.joinProvedorpeopleID(this.peopleIdNumber).subscribe((data) => {
      if (data.data.length === 0) {
        console.log('nothing');
        //this.providerForm.removeControl('id');
      } else {
        console.log('truesss');
        console.log(data.data[0]);
        const dataR: superInterfazI = data.data[0];

        this.providerForm.get('id')?.setValue(Number(dataR.provider_id));
        this.providerForm
          .get('prov_ranking')
          ?.setValue(dataR.prov_ranking || null);
        this.providerForm.get('prov_group')?.setValue(dataR.prov_group);
        this.providerForm
          .get('prov_description')
          ?.setValue(dataR.prov_description || null);
        this.providerForm
          .get('prov_status')
          ?.setValue(Number(dataR.prov_status));
        this.providerForm
          .get('people_peo_id')
          ?.setValue(Number(dataR.people_peo_id));
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
  }

  //cambiar contraseña activar opciones
  cambiarPassword() {
    this.banderaPassword = !this.banderaPassword;
  }

  //para controlar cambio de roles
  rol_user_change(form: UserI) {
    const rol_user = form.use_rol;
    alert(rol_user);
    if (rol_user == 'usuario') {
      this.rol_people_general = 'usuario';
    }
    if (rol_user == 'productor') {
      this.rol_people_general = 'productor';
    }

    if (rol_user == 'admin') {
      this.rol_people_general = 'admin';
    }

    this.userForm.get('use_rol')?.setValue(rol_user);
  }

  //guardar cambios (actualizar)

  actualizarPersona(form: PeopleI) {
    //console.log(form);

    this.peopleS.updatePerson(Number(form.id), form).subscribe((data) => {
      alert(data.status);
      this.route.navigate(['/people']);
    });
  }

  //guardarActualizarProveedor
  guardarActualizarProveedor(form: ProviderI) {
    console.log(form);

    if (form.id == null) {
      console.log('agregar datos proveedor');
      this.providerS.addProvider(form).subscribe((data) => {
        if (data.status) {
          Swal.fire('Datos de productor', '' + data.status, 'success');
        } else {
          Swal.fire('Datos de productor', '' + data.status, 'error');
        }
      });
    } else {
      console.log('actualizar datos');
    }
  }

  //guardar cambios usuario
  actualizarUsuario(form: UserI) {
    // console.log(form);
    this.userS.updateUser(Number(form.id), form).subscribe((data) => {
      console.log(data.status);
      if (data.status) {
        Swal.fire('Usuario', 'Datos actualizados exitosamente', 'success');
      } else {
        Swal.fire('Usuario', 'No se pudo actualizar los datos', 'error');
      }

      this.route.navigate(['/people/edit/' + this.peopleIdNumber]);
    });
  }

  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }
}
