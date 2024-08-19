import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent  implements OnInit{

  bandera_mostar_mapas:boolean = true;
  array_products: any[] = [];
  ubicacion_producto: string = "";

  constructor(
    private ProductS: ProductService,
    private route: Router,

  ){}

  ngOnInit(): void {
    this.mostrarProductoUbicacion("");
  }

  verproductoIndividual(id: number){
    this.route.navigate(['/product/show/', id]);

  }

  mostrarProductoUbicacion(ubicacion: string){
if(ubicacion == ""){
 return
}else{
  this.ProductS.filtrarPorUbicacion(ubicacion).subscribe(
    (data)=>{
      if(data.length >0){
        this.bandera_mostar_mapas =false;
        this.array_products = data;
      }else{
        Swal.fire('Productos', "No hay productos en esta ubicación por el momento", 'info')
        this.bandera_mostar_mapas = true;
      }
    }
  )
}



  }


  controlUbicaciones(selec: number){
    let ubicacion: string = "";
    switch(selec){
      case 1:
        ubicacion  = "Popayán"; //poner tal cual esta en base datos
      break;
      case 2:
        ubicacion = "Cajibío";
      break;
      case 3:
        ubicacion = "El tambo"
        break
        case 4:
        ubicacion = "Timbío"
        break
        case 5:
        ubicacion = "Otra"
        break
        default:
          ubicacion = ""
          break
    }
    this.ubicacion_producto = ubicacion;
    this.mostrarProductoUbicacion(ubicacion);
  }

  navVerMapas(){
        this.bandera_mostar_mapas = true;
  }

}
