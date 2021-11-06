import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IziToast } from 'izitoast';
import { DiscountService } from 'src/app/services/discount.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

declare const iziToast: IziToast;
declare const jQuery: any;
declare const $: any;
@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {
  public discount: any = {};
  public file?: File = undefined;
  public imgSelected: any | ArrayBuffer = 'assets/img/default.jpg';
  public token;
  public btnDisabled = false;
  public id: any;
  public url;
  constructor(private router: Router, private route: ActivatedRoute, private discountService: DiscountService,  private loginService: LoginService,) {
    this.token = this.loginService.getToken();
    this.url = environment.dbUrl;
   }

  ngOnInit(): void {
    this.getIdDiscount();
  }

  getIdDiscount(){
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.discountService.getDiscount(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.discount = undefined;
          } else {
            this.discount = response.data;
            this.imgSelected = `${this.url}getBannerDiscount/${this.discount.banner}`;
          }
        },
        (error) => {}
      );
    });
  }

  updateDiscount(form: any) {
    if (form.valid) {
      if (this.discount.discount >= 1 && this.discount.discount <= 100) {
        const data: any =  {};
      if (this.file !== undefined) {
        data.banner = this.file;
      }

      data.title = this.discount.title;
      data.discount = this.discount.discount;
      data.init_date = this.discount.init_date;
      data.end_date = this.discount.end_date;
      this.btnDisabled = true;
      this.discountService.updateDiscount(data, this.id, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se actualizó correctamente el descuento',
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
          this.btnDisabled = false;
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
