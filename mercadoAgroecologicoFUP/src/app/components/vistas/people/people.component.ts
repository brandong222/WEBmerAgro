import { Component, OnInit } from '@angular/core';
import { PeopleI } from 'src/app/models/people.interface';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  peopleArray: PeopleI[] = [];

  constructor(private peopleS: PeopleService) {}

  ngOnInit(): void {
    this.mostrarPeople();
  }

  mostrarPeople() {
    this.peopleS.getPeople().subscribe((data) => {
     console.log(data);
      this.peopleArray = data;
    });
  }
}
