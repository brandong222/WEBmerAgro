import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserADDComponent implements OnInit {



people_id: string = "";

constructor(private route: ActivatedRoute){}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
 if (id!== null) {
  this.people_id = id;
} else {
  console.error('El parámetro "id" no está presente en la URL.');
}
}



}
