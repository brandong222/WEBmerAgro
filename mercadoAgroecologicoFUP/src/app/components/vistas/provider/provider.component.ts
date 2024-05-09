import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderI } from 'src/app/models/provider.interface';
import { ProviderService } from 'src/app/services/provider/provider.service';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  constructor(private providerS: ProviderService, private route: Router) { }

  providerArray: ProviderI[] = [];

  ngOnInit(): void {
    this.providerS.getProvider().subscribe(data=>{
      console.log(data);
    })
  }

}
