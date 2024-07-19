import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryI } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImagenService } from 'src/app/services/subirIMAGEN/imagen.service';
import { superInterfazI } from 'src/app/models/superInterfaz.interface';
import { JoinService } from 'src/app/services/join/join.service';
import { UserI } from 'src/app/models/user.interface';
import { ProviderI } from 'src/app/models/provider.interface';
import { PeopleI } from 'src/app/models/people.interface';
import { responsiveI } from 'src/app/models/response.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductADDComponent implements OnInit {
  fkCategoryList: categoryI[] = [];
  selectedFile: File | null = null;
  public imageURL: string = 'API image';
  bandera_imagen_subida: boolean = false;
  link_imagen_subida: string = "";
  productForm: FormGroup;

  constructor(
    private productS: ProductService,
    private route: Router,
    private fkcategoryS: CategoryService,
    private imagenS: ImagenService,
    private fkjoinS: JoinService
  ) {
    this.productForm = new FormGroup({
      pro_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      pro_type: new FormControl('venta', Validators.required),
      pro_price: new FormControl(null, [Validators.required,  Validators.pattern(/^\d+$/)]),
      pro_certs: new FormControl('en transición', Validators.required),
      pro_image: new FormControl('', Validators.required),
      pro_unit: new FormControl('', Validators.required),
      pro_description: new FormControl('', Validators.required),
      pro_status: new FormControl(1, Validators.required),
      providers_id: new FormControl(null),
      categories_id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategories();

    //test
    this.getproviderID();
  }
  //para guardar imagen en la base datos y retornar su url
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files? target.files[0] : null;

    // Verificar si se seleccionó un archivo
    if (!this.selectedFile) {
      Swal.fire('Imagen','Debe selecionar un archivo','error');
      return;
    }

    // Lista de tipos MIME permitidos (puedes ajustar esto según tus necesidades)
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp'
    ];


    // Obtener el tipo MIME del archivo seleccionado
    const fileType = this.selectedFile.type;

    // Verificar si el tipo de archivo es permitido
    if (!allowedMimeTypes.includes(fileType)) {
      Swal.fire('Imagen','Formato de imagen no valido','error');
      target.value = '';
    } else {
      const imageUrl = URL.createObjectURL(this.selectedFile);

      Swal.fire({
        title:
          '<img src="' +
          imageUrl +
          '" alt="Imagen seleccionada" style="width:200px;">',
        text: "¿Desea elegir la imagen para promocionar su producto?",
        showCancelButton: true,
        confirmButtonColor: '#115511',
        cancelButtonColor: '#222',
        confirmButtonText: 'Si, elegir',
        cancelButtonText: 'cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subirImagen();
          this.bandera_imagen_subida = true;

        }else{
          this.selectedFile = null;
          this.bandera_imagen_subida = false;

        }
      })

    }
  }

  subirImagen() {
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.imagenS.uploadFile(this.selectedFile).subscribe((data) => {
        this.link_imagen_subida = (data.data);
        this.imageURL = data.data;
        this.productForm.get('pro_image')?.setValue(this.imageURL || '');
      });
    } else {
      alert('imagen no se pudo cargar');
    }
  }

  //para traer las categorias y luego mostrar en un select en html
  getCategories() {
    this.fkcategoryS.getCategory().subscribe((data) => {
      this.fkCategoryList = data;
    });
  }


  //para traer el id de provedor para guardar en formulario
  getproviderID()  {
    const id_provedor: UserI = this.traerDatosSesion();
    this.fkjoinS
      .joinProvedorpeopleID(Number(id_provedor.people_id))
      .subscribe((data) => {
        const id_provedor: any = data.data[0];
        this.productForm.get('providers_id')?.setValue(id_provedor.provider_id || null);
      });

  }

  guardarProducto(form: ProductI) {
    const numericCategoriesId = Number(form.categories_id);

    if(!this.productForm.validator){

    // Actualizar el valor de categories_id en el formulario
    this.productForm.patchValue({
      categories_id: numericCategoriesId,
    });


    this.productS.addProduct(form).subscribe(
      (data) => {

      if(data.status){
        this.route.navigate(['/product']);
        Swal.fire('Datos de producto','producto registrado existosamente','success')
      }else{
        Swal.fire('Datos de producto', 'No se puede registrar producto verifique la información y no olvide incluir una imagen', 'error')
      }


    }, (Error)=>{
      Swal.fire('Datos de producto', 'No se puede registrar producto verifique la información y no olvide incluir una imagen', 'error')

    });
    }

  }

  traerDatosSesion() {
    const usuarioData = sessionStorage.getItem('usuario_login');

    if (usuarioData) {
      return JSON.parse(usuarioData);
    }
  }
}
