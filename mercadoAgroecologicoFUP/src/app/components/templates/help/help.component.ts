import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {


  showDocumentation(){
    Swal.fire('', '', 'question');


    Swal.fire({
      title:'Documentación',
      html: '¿Decea ver la documentación de mercado agroecológico 4.0?',
      showCancelButton: true,
      cancelButtonColor: '#222',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'ver documentación (guía)',
      confirmButtonColor: '#32974f',
    }).then((result) => {
      if (result.isConfirmed) {
        const ruta = '../../../../assets/documentation/manual.pdf';
        window.open(ruta, '_blank');

      }
    });
  }

}
