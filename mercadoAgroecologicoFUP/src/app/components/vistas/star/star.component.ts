import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  num_star: number = 0;

  ngOnInit(): void {

  }

  constructor() {}


  @Output() calificacionSeleccionada = new EventEmitter<number>();


  numeroEstrellas(estrellas: number) {
    switch (estrellas) {
      case 1:
        this.num_star = 1;
        this.calificacionSeleccionada.emit(estrellas);
        break;

      case 2:
        this.num_star = 2;
        this.calificacionSeleccionada.emit(estrellas);
        break;

      case 3:
        this.num_star = 3;
        this.calificacionSeleccionada.emit(estrellas);

        break;

      case 4:
        this.num_star = 4;
        this.calificacionSeleccionada.emit(estrellas);


        break;
      case 5:
        this.num_star = 5;
        this.calificacionSeleccionada.emit(estrellas);


        break;
      default:
        this.num_star = 0;
        this.calificacionSeleccionada.emit(0);

        break;
    }
  }
}
