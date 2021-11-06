import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { IziToast } from 'izitoast';
import { DiscountService } from '../../../services/discount.service';
declare const iziToast: IziToast;
declare const jQuery: any;
declare const $: any;
@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.scss']
})
export class CreateDiscountComponent implements OnInit {
  public discount: any = {};
  public file?: File = undefined;
  public imgSelected: any | ArrayBuffer = 'assets/img/default.jpg';
  public token;
  public btnDisabled = false;

  constructor( private loginService: LoginService, private discountService: DiscountService,  private router: Router) {

    this.token = this.loginService.getToken();
    
   }

  ngOnInit(): void {
  }

  registerDiscount(form: any){
    if (form.valid) {
      if (this.file === undefined) {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'El banner del descuento es necesaria',
          titleColor: '#FF0000',
          color: '#FFF',
          zindex: 2,
        });
      } else {
        if (this.discount.discount >= 1 && this.discount.discount <= 100) {
          this.btnDisabled = true;
          this.discountService.registerDiscount(this.discount, this.file, this.token).subscribe(
            () => {
              iziToast.show({
                title: 'SUCCESS',
                class: 'text-success',
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message: 'Se registró correctamente el descuento',
                titleColor: '#1DC74C',
                color: '#FFF',
                zindex: 2,
              });
              this.discount = {
                title: '',
                banner: '',
                discount: '',
                init_date: '',
                end_date: '',
              };
              this.btnDisabled = false;
              this.router.navigate(['/panel/discounts']);
            },
            error => {
              console.error(error);
            }
          );
        } else {
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'El descuento debe ser entre 0% y 100%',
            titleColor: '#FF0000',
            color: '#FFF',
            zindex: 2,
          });
        }
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
      console.log(file.size);
      if (file.size <= 4000000) { // menor a 4mb
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif'|| file.type === 'image/jpeg') {
          const reader = new FileReader();
          reader.onload = () => this.imgSelected = reader.result; // imagen en BASE64
          reader.readAsDataURL(file);
          $('#input-banner').text(file.name);
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
          $('#input-banner').text('select image');
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
        $('#input-banner').text('select image');
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
      $('#input-banner').text('select image');
      this.imgSelected = 'assets/img/default.jpg';
      this.file = undefined;
    }
  }

}
