import { Component, OnInit } from '@angular/core';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';
import { RequestI } from 'src/app/models/request.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { UserI } from 'src/app/models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPASSWORDComponent implements OnInit {


  requestForm: FormGroup;
  bandera_comprobar_user: boolean = false;

  correo_use_id: number = 0;
  correo_peo_mail: string = '';


  constructor(
    private requestS: RequestappService,
    private fkjoinS: JoinService,
    private route: Router,
    private loginS: LoginService,
    private location: Location,
  ) {

    this.requestForm = new FormGroup({
      req_dateRequest: new FormControl('', Validators.required),
      req_type: new FormControl('', Validators.required),
      req_description: new FormControl('', Validators.required),
      req_status: new FormControl(0, Validators.required),
      people_id: new FormControl(0),
      use_cc: new FormControl(''),
      use_cc_conf: new FormControl(''),
    });


  }

  ngOnInit(): void {
    this.mostrarRequest();
  }

  mostrarRequest() {
      this.requestForm.get('req_status')?.setValue(1 || null);
      this.requestForm.get('req_type')?.setValue("Contraseña");
      this.requestForm.get('req_description')?.setValue("Olvide mi contraseña");


    this.setTodayDate();

  }

  //Traer fecha
  getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan en 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  //Poner fecha
  setTodayDate() {
    this.requestForm.get('req_dateRequest')?.setValue(this.getTodayDate(), { emitEvent: false }); // Opcionalmente, puedes evitar emitir el evento si no es necesario
  }



  //evaluar que el usuario sea igaul en ambos campos
  evaluarCuentaUsuario(){

    const valorUseCc = String(this.requestForm.get('use_cc')?.value??'');

    if (valorUseCc.length >0) {

      this.loginS.searchPhoneCCid(valorUseCc).subscribe(
        (data) => {
          if(data.length>0){

            this.correo_peo_mail = data[0].peo_mail
            this.correo_use_id = data[0].use_id

            if(data[0].use_cc == valorUseCc){
              this.requestForm.get('people_id')?.setValue(Number(data[0].people_id));
              this.bandera_comprobar_user = true;
              Swal.fire(
                'Verificación de datos',
                'Por favor Elija el metodo para recuperar su contraseña',
                'success'
              )

            }
          }else{
            Swal.fire(
              'Cuenta de usuarrio',
              'Su cuenta no se encuentra registrada o sus credenciales son incorrectas',
              'warning'
            )
          }


      },
      (Error)=>{
        Swal.fire(
          'Valores incorrectos',
          'Por favor revise sus datos e intente nuevamente',
          'error'
        )
      });


    } else {
      console.log("no hay valores");
    }
  }


  //guardar en db una persona
  enviarSolicitudContrasena(form: RequestI) {

    this.bandera_comprobar_user = false;

if(this.requestForm.valid){
  this.requestS.addRequestContrasena(form).subscribe(

    (data) => {
      let dataR = data;

      if (dataR.status) {
        Swal.fire(
          'Solicitud ',
          'enviada exitosamente',
          'success'
        )

        this.route.navigate(['/']);
      }
    },
    (error) => {
      // Aquí manejas el error alertas
      Swal.fire(
        'Solicitud invalidad',
        'Ingrese descripción',
        'error'
      )
    }
  );
}else{
  Swal.fire('Solicitud', 'verifique los campos e intente nuevamente', 'error');
}


  }

//Enviar correo electronico

enviarCorreoElectronico(){
  this.loginS.sendEmailUser(this.correo_peo_mail, this.correo_use_id).subscribe(
    data=>{
      Swal.fire('Restablecer contraseña',
        'Se envio los pasos para restablecer la contraseña a este correo: \n'+this.correo_peo_mail,
        'success'
      )
  }, Error=>{
    Swal.fire('Restablecer contraseña',
      'Se ha producido un error, verifique su información o envie una solicitud a un administrador',
      'warning'
    )
  })
}


  //regresar
  nvRegresar() {
    this.location.back();
  }
}
