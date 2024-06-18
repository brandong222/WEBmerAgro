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
export class PeopleADDComponent implements OnInit {
  selectedFile: File | null = null;
  imageURL: string = 'API image';
  link_imagen_subida:string ="";
  peopleForm: FormGroup;

  bandera_valid_form: boolean = false;


  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private route: Router,
    private peopleS: PeopleService,
    private imagenS: ImagenService
  ) {
    this.peopleForm = new FormGroup({
      peo_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      peo_lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      peo_adress: new FormControl('', [Validators.required]),
      peo_dateBirth: new FormControl('', [Validators.required]),
      peo_image: new FormControl(''),
      peo_mail: new FormControl('', [Validators.required, Validators.email]),
      peo_phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]),
    });
  }




  ngOnInit(): void {

  }

  //para guardar imagen en la base datos y retornar su url
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files? target.files[0] : null;

    // Verificar si se seleccionó un archivo
    if (!this.selectedFile) {
      Swal.fire('Imagen','Debe selecionar un archivo','error');
      return;
    }

    // Lista de tipos MIME permitidos (puedes ajustar esto según tus necesidades)
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp'
    ];


    // Obtener el tipo MIME del archivo seleccionado
    const fileType = this.selectedFile.type;

    // Verificar si el tipo de archivo es permitido
    if (!allowedMimeTypes.includes(fileType)) {
      Swal.fire('Imagen','Formato de imagen no valido','error');
      target.value = '';
    } else {
      Swal.fire({
        title: 'Imagen',
        text: "¿Desea elegir la imagen para su perfil?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#292',
        cancelButtonColor: '#222',
        confirmButtonText: 'Si, elegir'
      }).then((result) => {
        if (result.isConfirmed) {
          this.subirImagen();

        }
      })

    }
  }

  subirImagen(){
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.imagenS.uploadFile(this.selectedFile).subscribe((data) => {
        this.imageURL = data.data;
        this.peopleForm.get('peo_image')?.setValue(this.imageURL || '');
        Swal.fire('Imagen','Subida con exito','success');
        this.link_imagen_subida = String(data.data);
      });
    } else {
      Swal.fire('Imagen','No guardo la imagen selecionada','error');
    }
  }

  //guardar en db una persona
  guardarPersona(form: PeopleI) {
        console.log(form);
        if (this.peopleForm.valid) {
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
               Swal.fire('Datos de registro', 'Verifique su información e incluir una imagen', 'error')

            }
          );

        }else{

        Swal.fire('Datos del formulario','No se puede registrar los datos','error')


        }

  }

  //guardar persona

  //navegation
  navegateToRegresar() {
    this.route.navigate(['/']);
  }
}
