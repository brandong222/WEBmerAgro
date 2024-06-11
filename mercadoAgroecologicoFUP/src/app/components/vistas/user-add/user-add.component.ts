import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { responsiveI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserADDComponent implements OnInit {
  private peopleIdNumber: number = Number(
    this.routeA.snapshot.paramMap.get('id')

  );

  contrasena: string= '';
  bandera_confirmar_password: boolean  = false;

  userForm = new FormGroup({
    use_cc: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern('^[0-9]+$')]),
    use_password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    use_rol: new FormControl('usuario', Validators.required),
    use_status: new FormControl(1, Validators.required),
    people_id: new FormControl(this.peopleIdNumber, Validators.required),
  });

  constructor(
    private routeA: ActivatedRoute,
    private userS: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {}


  verificarContrasena(event: any) {
    const confirmPassword = event.target.value;
    if (confirmPassword === this.contrasena  ) {
      this.bandera_confirmar_password = true;
    } else {
      this.bandera_confirmar_password = false;
    }
  }

  almacenarContrasenaValor(pass: any){
  this.contrasena = String(pass);

  }

  guardarUser(form: UserI) {
    if(this.userForm.valid){
     this.userS.AddUser(form).subscribe(
      (data) => {
        if(data.status){
          Swal.fire('Datos de usuario','registrados exitosamente','success')
          this.route.navigate(['']);
        }else{

          Swal.fire('Datos de usuario','No se pudo registrar','error')
        }

      },
    (Error)=>{
      Swal.fire('Datos de usuario','La cuenta de usuario ya existe','error')

    }
    );


    }else{
      Swal.fire('Datos de usuario','verifique los campos e intente nuevamente','error')

    }

  }
}
