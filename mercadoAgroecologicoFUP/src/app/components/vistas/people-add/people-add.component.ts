import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from 'src/app/services/people/people.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeopleI } from 'src/app/models/people.interface';
import { ImagenService } from 'src/app/services/subirIMAGEN/imagen.service';
import { responsiveI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.css'],
})
export class PeopleADDComponent {
  selectedFile: File | null = null;
  public imageURL: string = 'API image';
  peopleForm: FormGroup;


  constructor(
    private route: Router,
    private peopleS: PeopleService,
    private imagenS: ImagenService
  ) {
    this.peopleForm = new FormGroup({
      peo_name: new FormControl('', Validators.required),
      peo_lastName: new FormControl('', Validators.required),
      peo_adress: new FormControl('', Validators.required),
      peo_dateBirth: new FormControl('', Validators.required),
      peo_image: new FormControl(''),
      peo_mail: new FormControl('', Validators.required),
      peo_phone: new FormControl('', Validators.required),
    });
  }



  //para guardar imagen en la base datos y retornar su url
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files ? target.files[0] : null;
  }

  subirImagen(){
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.imagenS.uploadFile(this.selectedFile).subscribe((data) => {
        console.log(data.data);
        this.imageURL = data.data;
        this.peopleForm.get('peo_image')?.setValue(this.imageURL || '');
        alert('imagen subida con exito');
      });
    } else {
      alert('imagen no se pudo cargar');
    }
  }

  //guardar en db una persona
  guardarPersona(form: PeopleI) {
        console.log(form);

        this.peopleS.addPeople(form).subscribe(
          (data) => {
            let dataR: responsiveI = data;

            if (dataR.status) {
              Swal.fire(
                'Datos de '+dataR.data.peo_name,
                'Registrados exitosamente',
                'success'
              )

              this.route.navigate(['/user/add/', dataR.data.id]);
            }
          },
          (error) => {
            // Aquí manejas el error alertas
            alert('no se guardo');
          }
        );

  }

  //guardar persona

  //navegation
  navegateToRegresar() {
    this.route.navigate(['/']);
  }
}
