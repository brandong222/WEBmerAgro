import { ProductI } from './../../../models/product.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleI } from 'src/app/models/people.interface';
import { ProviderI } from 'src/app/models/provider.interface';
import { UserI } from 'src/app/models/user.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
})
export class ProductSHOWComponent implements OnInit {
  //variable verificar si coincide el producto con su dueño
  bandera_provider_own: boolean = false;

  //tomar id de las rutas
  productIdNumber: number = 0;

  //bandera  y provedor_id
  banderaCalificar: boolean = true;
  rolUsuario: string = '';

  //variables y arreglos
  productUnitArray: any[] = [];
  banderaStar: boolean = false;
  productosRelacionados: any[] = [];
  numeroContacto: number = 0;
  contarEstrellas: number = 0;
  estrellas_productor_bd: number = 0;
  id_provider: number = 0;

  constructor(
    private routeA: ActivatedRoute,
    private productS: ProductService,
    private route: Router,
    private fkjoinS: JoinService,
    private providerS: ProviderService,
    private peopleS: PeopleService,
    private providers: ProviderService
  ) {}

  ngOnInit() {
    this.productIdNumber = Number(this.routeA.snapshot.paramMap.get('id'));

    this.validarRoles();
    this.navContactar();
    this.mostrarProductoID();
    this.mostrarOtrosProductos(); // para mas productos
  }

  //validar roles de usuario
  validarRoles() {
    const sesion: UserI = this.traerDatosSesion();
    this.rolUsuario = String(sesion.use_rol);
  }

  //para obtener estrellas de componente
  obtenerNumeroEstrellas(star: number) {


  if(this.estrellas_productor_bd == 0){
    this.contarEstrellas = star;
  }else{
    this.contarEstrellas = ((star+this.estrellas_productor_bd)/2)

  }


  }

  mostrarProductoID() {
    this.productS
      .getProductId(Number(this.productIdNumber))
      .subscribe((data) => {
        this.providerS
          .getProviderId(Number(data[0].providers_id))
          .subscribe((data) => {
            this.estrellas_productor_bd = data.data.prov_ranking;
          });

        this.productUnitArray = data;

        this.evaluarProveedorEsDuenioProducto(Number(data[0].providers_id));
        this.id_provider = Number(data[0].providers_id);
      });
  }

  evaluarProveedorEsDuenioProducto(provider_id_producto: number) {
    const sesion: UserI = this.traerDatosSesion();

    //comparar con el id sesion
    this.fkjoinS
      .compararSesionProviderConProductProviderID(
        provider_id_producto,
        Number(sesion.id)
      )
      .subscribe((data) => {
        console.log(data.status);
        if (data.status) {
          this.bandera_provider_own = true;
        } else {
          this.bandera_provider_own = false;
        }
      });
  }

  eliminarProducto(id: number) {


    Swal.fire({
      title: 'Eliminar Producto',
      text: "Está seguro que quiere eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productS.deleteProduct(id).subscribe((data) => {
          Swal.fire('Producto', 'se elimino el producto exitosamente', 'success')
          this.route.navigate(['/product']);
        });
      }
    })



  }

  mostrarOtrosProductos() {
    this.productS.getproductos().subscribe((data) => {
      this.productosRelacionados = data;
      this.productosRelacionados.sort(() => Math.random() - 0.5);
    });
  }

  //Traer datos sesion para habilitar por rol las opciones
  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }

  //NAVEGACION **

  //para editar producto
  navEditarProducto() {
    this.route.navigate(['product/edit/', this.productIdNumber]);
  }

  //para ir a perfil

  navPerfilShow(id_product: number) {
    this.route.navigate(['/people/show/' + id_product]);
  }

  //ir a ventana para calificar con strellas
  navStar() {
    this.banderaStar = !this.banderaStar;
    if (!this.banderaStar) {
    if(this.contarEstrellas > 0){
        //traer datos id_provedor
        const id_product = this.productIdNumber;

        //traer id del provedor con id de su producto
        this.productS.getProductId(id_product).subscribe((data) => {
          const datosProduct: ProductI = data[0];

          //guardar cambios de estrellas para proveedor
          this.providerS.updateOnlyRanking(Number(datosProduct.providers_id),this.contarEstrellas).subscribe((data) => {
              if (data.status) {
                Swal.fire('Calificación', 'Calificación exitosa', 'success');
              } else {
                Swal.fire(
                  'Calificación',
                  'No se pudo registrar Calificación',
                  'error'
                );
              }
            });
        });
    }else{
      Swal.fire('Calificación', 'No se guardo, debe elegir un valor', 'error');
    }





    }
  }

  verproductoIndividual(id: number) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/product/show/', id]);
    });
  }

  navContactar() {
    const id_product = this.productIdNumber;

    //traer id del provedor con id de su producto
    this.productS.getProductId(id_product).subscribe((data) => {
      const datosProduct: ProductI = data[0];
      console.log(datosProduct.providers_id);

      this.providerS
        .getProviderId(Number(datosProduct.providers_id))
        .subscribe((data) => {
          const dataProvider: ProviderI = data.data;

          this.peopleS
            .getPersonById(Number(dataProvider.people_peo_id))
            .subscribe((data) => {
              const numeroPeople: PeopleI = data.data;
              this.numeroContacto = Number(numeroPeople.peo_phone);
            });
        });
    });
  }

  //Navegacion
  navEditarProveedor(id: number) {
    if (id > 0) {
      this.route.navigate(['/provider/edit/' + id]);
    } else {
      alert('error');
      this.route.navigate(['/provider']);
    }
  }
}
