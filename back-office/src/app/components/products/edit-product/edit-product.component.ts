import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { IziToast } from 'izitoast';
import { ConfigService } from 'src/app/services/config.service';

declare const iziToast: IziToast;
declare const jQuery: any;
declare const $: any;
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public product: any = {};
  public config: any = {};
  public token;
  public imgSelected: any | ArrayBuffer;
  public btnDisabled = false;
  public id: any;
  public url;
  public file?: File = undefined;
  public configGlobal: any = {};
  constructor(private producService: ProductService, private loginService: LoginService, private configService: ConfigService,  private router: Router, private route: ActivatedRoute) { 
    this.config = {
      height: 500
    };
    this.token = this.loginService.getToken();
    this.url = environment.dbUrl;
    this.configService.getConfigEcommerce().subscribe(
      response => {
        this.configGlobal = response.data;
      },
      error => {

      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.producService.getProduct(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.product = undefined;
          } else {
            this.product = response.data;
            this.imgSelected = `${this.url}getCoverProduct/${this.product.cover}`;
          }
        },
        (error) => {}
      );
    });
  }


  updateProduct(form: any) {
    if (form.valid) {
      const data: any =  {};
      if (this.file !== undefined) {
        data.cover = this.file;
      }

      data.title = this.product.title;
      data.stock = this.product.stock;
      data.price = this.product.price;
      data.category = this.product.category;
      data.description = this.product.description;
      data.content = this.product.content;
      this.btnDisabled = true;
      this.producService.updateProduct(data, this.id, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se actualizó correctamente el producto',
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
          this.btnDisabled = false;
        }
      );


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
