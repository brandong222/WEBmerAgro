import { Component, OnInit } from '@angular/core';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { RequestappService } from 'src/app/services/requestapp/requestapp.service';
import { RequestI } from 'src/app/models/request.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { UserI } from 'src/app/models/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requestapp-add',
  templateUrl: './requestapp-add.component.html',
  styleUrls: ['./requestapp-add.component.css']
})
export class RequestappADDComponent  implements OnInit{
  requestArray: superInterfazI[] = [];
  requestForm: FormGroup;

  constructor(
    private requestS: RequestappService,
    private fkjoinS: JoinService,
    private route: Router,
  ) {

    this.requestForm = new FormGroup({
      req_dateRequest: new FormControl('', Validators.required),
      req_type: new FormControl('', Validators.required),
      req_description: new FormControl('', Validators.required),
      req_status: new FormControl(0 , Validators.required),
      people_id: new FormControl(0 ,Validators.required),
    });

  }

  ngOnInit(): void {
  this.mostrarRequest();
  }

  mostrarRequest(){
    const request_id: superInterfazI = this.traerDatosSesion();
    const user_id: UserI = this.traerDatosSesion();

    this.fkjoinS.getjoinUserPeople(Number(user_id.id)).subscribe(data=>{
      console.log(data.data)
      this.requestArray = data.data;
      this.requestForm.get('people_id')?.setValue(request_id.people_id || null);
      this.requestForm.get('req_status')?.setValue(request_id.use_status || null);

      if(request_id.use_rol === 'usuario'){
        this.requestForm.get('req_type')?.setValue("Ser productor");
      }else if (request_id.use_rol === 'productor'){
        this.requestForm.get('req_type')?.setValue("Certificar producto (s)");
      }
    })
  }


  traerDatosSesion(){
    const requestData = sessionStorage.getItem('usuario_login')
    if (requestData) {
      return JSON.parse(requestData)
      console.log(requestData)
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
        alert('no se guardo');
      }
    );

}

}
