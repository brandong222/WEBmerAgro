import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null = null;
  use_id: string | null = null;

  bandera_barra_carga: boolean= true;

  password: string = '';
  confirmPassword: string = '';
  bandera_confirmar_password: boolean = false;


  constructor(
    private routeA: ActivatedRoute,
    private loginS: LoginService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.routeA.params.subscribe(params => {
      this.token = params['token'];
    });

    // Obtener el user_id desde la query string
    this.routeA.queryParams.subscribe(queryParams => {
      this.use_id = queryParams['use_id'];
    });
  }


  actualizarNuevaPassword(){
    this.bandera_barra_carga = false;

this.loginS.resetNewPassword(this.password, String(this.token), Number(this.use_id)).subscribe(
  data=>{
    if(data.status){
      Swal.fire('Restablecer contraseña', 'Se actualizo la contraseña con exito!!', 'success')
    }else{
      Swal.fire('Restablecer contraseña', 'Error al actualizar, caduco el token', 'error')

    }

    this.route.navigate(['/']);
    this.bandera_barra_carga = true;

  },
  Error =>{
    Swal.fire('Restablecer contraseña', 'Error al actualizar, caduco el tiempo de restablecimiento', 'error')
    this.route.navigate(['/']);
    this.bandera_barra_carga = true;


  }
)

  }



  verificarContrasenas(): void {
    if (this.password === this.confirmPassword) {
      this.bandera_confirmar_password = true;  // Las contraseñas coinciden
    } else {
      this.bandera_confirmar_password = false;  // Las contraseñas no coinciden
    }
  }
}
