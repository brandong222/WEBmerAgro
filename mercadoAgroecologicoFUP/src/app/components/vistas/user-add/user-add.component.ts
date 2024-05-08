import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { responsiveI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserADDComponent implements OnInit {
  private peopleIdNumber: number = Number(
    this.routeA.snapshot.paramMap.get('id')
  );

  userForm = new FormGroup({
    use_cc: new FormControl('', Validators.required),
    use_password: new FormControl('', Validators.required),
    use_rol: new FormControl('usuario', Validators.required),
    use_status: new FormControl(1, Validators.required),
    people_id: new FormControl(this.peopleIdNumber, Validators.required),
  });

  constructor(
    private routeA: ActivatedRoute,
    private userS: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  guardarUser(form: UserI) {
    console.log(form);

    this.userS.AddUser(form).subscribe((data) => {
      console.log(data.message);
      console.log(data.status);
      this.route.navigate(['']);
    });
  }
}
