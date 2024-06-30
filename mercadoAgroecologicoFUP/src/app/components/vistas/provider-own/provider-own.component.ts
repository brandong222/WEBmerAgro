import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { ProviderI } from 'src/app/models/provider.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-own',
  templateUrl: './provider-own.component.html',
  styleUrls: ['./provider-own.component.css'],
})
export class ProviderOWNComponent implements OnInit {
  providerArray: any[] = [];
  bandera_edit_provider: boolean = false;
  providerForm: FormGroup;
  constructor(
    private fpkjoinS: JoinService,
    private providerS: ProviderService,
    private route: Router
  ) {
    this.providerForm = new FormGroup({
      id: new FormControl(0),
      prov_ranking: new FormControl(0),
      prov_group: new FormControl('', Validators.required),
      prov_description: new FormControl('', Validators.required),
      prov_status: new FormControl(1),
      people_peo_id: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.mostrarInforProvedor();
  }

  mostrarInforProvedor() {
    const sesion: UserI = this.traerDatosSesion();

    this.fpkjoinS
      .joinProvedorpeopleID(Number(sesion.people_id))
      .subscribe((data) => {
        this.providerArray = data.data;
      });
  }

  mostrarDatosProvedorForEdit(id_provider: number) {
    this.providerS.getProviderId(id_provider).subscribe((data) => {
      const dataR: superInterfazI = data.data;

      this.providerForm.get('id')?.setValue(id_provider);
      this.providerForm.get('prov_ranking')?.setValue(dataR.prov_ranking);
      this.providerForm.get('prov_group')?.setValue(dataR.prov_group);
      this.providerForm
        .get('prov_description')
        ?.setValue(dataR.prov_description);
      this.providerForm.get('prov_status')?.setValue(Number(dataR.prov_status));
      this.providerForm
        .get('people_peo_id')
        ?.setValue(Number(dataR.people_peo_id));

      this.bandera_edit_provider = !this.bandera_edit_provider;
    });
  }

  habilitarCamposEdit(id: number) {
    this.mostrarDatosProvedorForEdit(id);
  }

  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }

  //LOGICA PARA ACTUALIZAR DATOS

  guardarActualizarProveedor(form: ProviderI) {

    if (this.providerForm.valid) {
      this.providerS.updateProvider(Number(form.id), form).subscribe(
        (data) => {
          Swal.fire(
            'Datos de productor',
            'Actualizados exitosamente',
            'success'
          );
          this.route.navigate(['/people']);
        },
        (Error) => {
          Swal.fire('Datos de productor', 'No se pudo actualizar', 'error');
        }
      );
    } else {
      Swal.fire('Datos de productor', 'Verifique la información', 'error');
    }


    this.bandera_edit_provider = !this.bandera_edit_provider;
  }
}
