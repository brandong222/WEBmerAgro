import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { ImagenService } from 'src/app/services/subirIMAGEN/imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  peopleForm: FormGroup;
  bandera_edit_people: boolean = false;

  selectedFile: File | null = null;
  imageURL: string = 'API image';
  link_imagen_subida:string ="";

  rol_user: string = '';
  bandera_loading: boolean = true;

  constructor(
    private route: Router,
    private peopleS: PeopleService,
    private fkjoinS: JoinService,
    private imagenS: ImagenService,
  ) {
    this.peopleForm = new FormGroup({
      id: new FormControl('', Validators.required),
      peo_name: new FormControl('', Validators.required),
      peo_lastName: new FormControl('', Validators.required),
      peo_adress: new FormControl('', Validators.required),
      peo_dateBirth: new FormControl(null),
      peo_image: new FormControl('', Validators.required),
      peo_mail: new FormControl('', Validators.required),
      peo_phone: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^\d+$/),
      ]),
    });
  }

  ngOnInit(): void {
    this.mostrarPeople();
  }

  mostrarPeople() {
    this.bandera_loading = false;
    const user_id: UserI = this.traerDatosSesion();
    this.rol_user = String(user_id.use_rol);

    this.fkjoinS.getjoinUserPeople(Number(user_id.id)).subscribe((data) => {
      console.log(data.data[0].people_id);
      this.peopleForm.get('id')?.setValue(Number(data.data[0].people_id));
      this.peopleForm.get('peo_name')?.setValue(data.data[0].peo_name);
      this.peopleForm.get('peo_lastName')?.setValue(data.data[0].peo_lastname);
      this.peopleForm.get('peo_adress')?.setValue(data.data[0].peo_adress);
      this.peopleForm
        .get('peo_dateBirth')
        ?.setValue(data.data[0].peo_dateBirth);
      this.peopleForm.get('peo_image')?.setValue(data.data[0].peo_image);
      this.link_imagen_subida = String(data.data[0].peo_image);
      this.peopleForm.get('peo_mail')?.setValue(data.data[0].peo_mail);
      this.peopleForm.get('peo_phone')?.setValue(data.data[0].peo_phone);
    this.bandera_loading = true;

    });
  }


//para guardar imagen en la base datos y retornar su url
onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  this.selectedFile = target.files? target.files[0] : null;

  // Verificar si se seleccionó un archivo
  if (!this.selectedFile) {
    Swal.fire('Imagen','Solo se permiten archivos JPEG y PNG','error');
    return;
  }

  // Lista de tipos MIME permitidos (puedes ajustar esto según tus necesidades)
  const allowedMimeTypes = ['image/jpeg', 'image/png'];

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
  if (this.selectedFile != null) {
    console.log(this.selectedFile);
    this.imagenS.uploadFile(this.selectedFile).subscribe((data) => {
      this.imageURL = data.data;
      this.peopleForm.get('peo_image')?.setValue(this.imageURL || '');
      Swal.fire('Imagen','Subida con exito','success');
      this.link_imagen_subida = String(data.data);
    });
  } else {
    Swal.fire('Imagen','Selecione una imagen valida','error');
  }
}


  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }

  //para activar la ediccion
  habilitarEditPeople() {
    Swal.fire(
      'Editar perfil',
      'Se habilito la opción de editar campos',
      'info'
    );
    this.bandera_edit_people = !this.bandera_edit_people;
  }

  guardarDatosPeople(form: PeopleI) {

    if (this.peopleForm.valid) {
      this.peopleS.updatePerson(Number(form.id), form).subscribe(
        (data) => {
          localStorage.setItem('user_name', String(form.peo_name));
          Swal.fire('Datos de usuario ', 'Actualizados exitosamente', 'success');
          this.route.navigate(['/home']);
        },
        (Error) => {
          Swal.fire('Datos de usuario', 'No se actualizo los datos', 'error');
        }
      );

      this.bandera_edit_people = !this.bandera_edit_people;

    }else{
      //manejar errores
      Swal.fire('Datos de usuario', 'Verifique su información y vuelva a intentar', 'error')
    }




  }

  //NAVEGACION

  //ver datos de sesion
  navDatosSesion() {
    this.route.navigate(['/user/']);
  }

  navDatosProveedor() {
    this.route.navigate(['/provider/own']);
  }
}
