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

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPASSWORDComponent implements OnInit {


  requestForm: FormGroup;


  constructor(
    private requestS: RequestappService,
    private fkjoinS: JoinService,
    private route: Router,
    private loginS: LoginService,
  ) {

    this.requestForm = new FormGroup({
      req_dateRequest: new FormControl('', Validators.required),
      req_type: new FormControl('', Validators.required),
      req_description: new FormControl('', Validators.required),
      req_status: new FormControl(0, Validators.required),
      people_id: new FormControl(0, Validators.required),
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
      this.getTodayDate();

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
  evaluarUsuario(form: RequestI){
    const valorUseCc = String(this.requestForm.get('use_cc')?.value??'');
    const valorUseCcConf = String(this.requestForm.get('use_cc_conf')?.value??'');

    console.log(valorUseCc)
    if (valorUseCc === valorUseCcConf) {

      this.loginS.searchPhoneCCid(valorUseCc).subscribe(
        (data) => {
          if(data.length>0){
            if(data[0].use_cc == valorUseCc){
              console.log(data[0].people_id)
              this.requestForm.get('people_id')?.setValue(Number(data[0].people_id));
              console.log("Existe")
              console.log(form);

            }
          }else{
            console.log("No existe el usuario en la base de datos")
          }


      },
      (Error)=>{
        Swal.fire(
          'Cuenta de usuarrio no encontrada',
          'Su cuenta no se encuentra registrada o sus credenciales son incorrectas',
          'error'
        )
      });


    } else {
      console.log("Los valores no son iguales.");
    }
  }


  //guardar en db una persona
  guardarRequest(form: RequestI) {
    console.log(form);

    this.requestS.addRequestapp(form).subscribe(
      (data) => {
        let dataR = data;

        if (dataR.status) {
          Swal.fire(
            'Solicitud ',
            'enviada',
            'success'
          )

          this.route.navigate(['/home']);
        }
      },
      (error) => {
        // Aquí manejas el error alertas
        Swal.fire(
          'Ingrese descripción',
        )
      }
    );

  }

}
