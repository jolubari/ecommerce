import { Component, OnInit } from '@angular/core';
import { IziToast } from 'izitoast';
import { ProductService } from '../../../services/product.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
declare const iziToast: IziToast;
declare const jQuery: any;
declare const $: any;
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public product: any = {};
  public file?: File = undefined;
  public imgSelected: any | ArrayBuffer = 'assets/img/default.jpg';
  public config: any = {};
  public token;
  public btnDisabled = false;
  public configGlobal: any = {};
  constructor( private producService: ProductService, private loginService: LoginService, private configService: ConfigService,  private router: Router ) {
    this.config = {
      height: 500
    };
    this.token = this.loginService.getToken();
    this.configService.getConfigEcommerce().subscribe(
      response => {
        this.configGlobal = response.data;
      },
      error => {

      }
    );
   }

  ngOnInit(): void {
  }

  registerProduct(form: any){
    if (form.valid) {
      if (this.file === undefined) {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'La imagen del producto es necesaria',
          titleColor: '#FF0000',
          color: '#FFF',
          zindex: 2,
        });
      } else {
        this.btnDisabled = true;
        this.producService.registerProduct(this.product, this.file, this.token).subscribe(
          () => {
            iziToast.show({
              title: 'SUCCESS',
              class: 'text-success',
              position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
              message: 'Se registro correctamente el producto',
              titleColor: '#1DC74C',
              color: '#FFF',
              zindex: 2,
            });
            this.product = {
              title: '',
              stock: '',
              price: '',
              category: '',
              description: '',
              content: ''
            };
            this.btnDisabled = false;
            this.router.navigate(['/panel/products']);
          },
          error => {
            console.error(error);
          }
        );
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'Los datos del formulario no son válidos',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
      this.btnDisabled = false;
    }
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      if (file.size <= 4000000) { // menor a 4mb
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif'|| file.type === 'image/jpeg') {
          const reader = new FileReader();
          reader.onload = () => this.imgSelected = reader.result; // imagen en BASE64
          reader.readAsDataURL(file);
          $('#input-cover').text(file.name);
          this.file = file;
        } else {
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'La imagen no tiene un formato permitido',
            titleColor: '#FF0000',
            color: '#FFF',
            zindex: 2,
          });
          $('#input-cover').text('select image');
          this.imgSelected = 'assets/img/default.jpg';
          this.file = undefined;
        }
      } else {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'La imagen supera el tamaño permitido, 4MB',
          titleColor: '#FF0000',
          color: '#FFF',
          zindex: 2,
        });
        $('#input-cover').text('select image');
        this.imgSelected = 'assets/img/default.jpg';
        this.file = undefined;
      }

    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'No hay una imagen disponible',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
      $('#input-cover').text('select image');
      this.imgSelected = 'assets/img/default.jpg';
      this.file = undefined;
    }
  }

}
