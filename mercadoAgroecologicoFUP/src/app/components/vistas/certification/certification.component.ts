import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent {
  checkList = [
    { id: 'checklist4', label: 'Cultiva sus productos con fertilizantes orgánicos' },
    { id: 'checklist5', label: 'Deja madurar sus productos' },
    { id: 'checklist6', label: 'No usa pesticidas o fertilizantes' },
    { id: 'checklist7', label: 'Cuenta con diversidad de cultivos' }

  ];

  selectedCount = 0;

  onCheckboxChange(event: any) {
    const index = this.checkList.findIndex(item => item.id === event.target.value);
    if (index!== -1) {
      this.selectedCount += event.target.checked? 1 : -1;
    }
  }

  calculateResult() {
    let message;
    if (this.selectedCount === 0) {
      message = 'No cumple con ningún requisito.';
    } else if (this.selectedCount === 1) {
      message = 'Cumple con 1 de 3 requisitos.';
    } else if (this.selectedCount === 2) {
      message = 'Cumple con 2 de 3 requisitos.';
    }else if(this.selectedCount === 3){
      message = 'Cumple con todos requisitos.';
      Swal.fire(message,'Solicita una visita','success')
    }

    if(this.selectedCount !== 3){
      Swal.fire(message,'Intenta completar','info')
    }

  }
}
