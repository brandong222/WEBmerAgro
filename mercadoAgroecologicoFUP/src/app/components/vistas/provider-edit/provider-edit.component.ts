import { Component, OnInit, Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { JoinService } from 'src/app/services/join/join.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css'],
})
export class ProviderEditComponent  implements OnInit{
  providerForm: FormGroup;
  //tomar id de las rutas
  providerIdNumber: number = Number(this.routeA.snapshot.paramMap.get('id'));

  constructor(
    private route: Router,
    private routeA: ActivatedRoute,
    private providerS: ProviderService,
    private fkjoinS: JoinService,
    )
     {
    this.providerForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      prov_ranking: new FormControl(0, Validators.required),
      prov_group: new FormControl('', Validators.required),
      prov_description: new FormControl('', Validators.required),
      prov_status: new FormControl(0, Validators.required),
      people_peo_id: new FormControl(0, Validators.required),
    });
  }

  ngOnInit(): void {
  this.datosProductoId();
  }

  datosProductoId() {
    console.log(this.providerIdNumber);
    this.providerS.getProviderId(this.providerIdNumber).subscribe((data) => {
      if (data) {
        console.log(data.data);
        const dataR: ProviderI = data.data;
        this.providerForm.get('id')?.setValue(Number(dataR.id));
        this.providerForm.get('prov_ranking')?.setValue(dataR.prov_ranking || null);
        this.providerForm.get('prov_group')?.setValue(dataR.prov_group || null);
        this.providerForm.get('prov_description')?.setValue(dataR.prov_description || null);
        this.providerForm.get('prov_status')?.setValue(dataR.prov_status || null);
        this.providerForm.get('people_peo_id')?.setValue(dataR.people_peo_id || null);

      } else {
        console.log('No hay datos guardados del producto.');
    }
    });
  }
}
