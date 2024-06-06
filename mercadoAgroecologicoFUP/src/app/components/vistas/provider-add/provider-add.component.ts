import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { JoinService } from 'src/app/services/join/join.service';
import { UserI } from 'src/app/models/user.interface';
@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.css']
})
export class ProviderADDComponent implements OnInit {
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
      people_peo_id: new FormControl(0 , Validators.required),
    });
  }

  ngOnInit(): void {
    this.datosPersona();

  }


  datosPersona(){
    const peopleData:UserI = this.traerDatosSesion();
    this.providerForm.get('people_peo_id')?.setValue(peopleData.people_id || null);
  }


  guardarProveedor( form: ProviderI){
  this.providerS.addProvider(form).subscribe(data=>{
    console.log(data.status);

    if(data.status){
      this.route.navigate(['/provider/']);
    }else{
      alert('error al guardar');
    }
  })
  }



  traerDatosSesion(){
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }
}
