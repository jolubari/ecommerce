import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IziToast } from 'izitoast';
import { environment } from 'src/environments/environment';
declare const iziToast: IziToast;
@Component({
  selector: 'app-variety-product',
  templateUrl: './variety-product.component.html',
  styleUrls: ['./variety-product.component.scss']
})
export class VarietyProductComponent implements OnInit {
  public product: any = {};
  public id: any;
  public token: any;
  public newVariety = '';
  public url;
  public updating= false;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.productService.getProduct(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.product = undefined;
          } else {
            this.product = response.data;
          }
        },
        (error) => {}
      );
    });
   }

  ngOnInit(): void {

  }

  addVariety() {
    if (this.newVariety) {
      this.product.varieties.push({ variety_title: this.newVariety });
      this.newVariety = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'El campo de la variedad debe ser completado',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

  deleteVariety(indexItem:any){
    this.product.varieties.splice(indexItem,1);
  }

  updateVariety(){
    if (this.product.variety_title) {
      if (this.product.varieties.length >= 1) {
        this.updating = true;
        this.productService.updateVarietiesProduct(this.id, 
          { variety_title: this.product.variety_title, varieties: this.product.varieties}, this.token).subscribe(
            response => {
              iziToast.show({
                title: 'SUCCESS',
                class: 'text-success',
                position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                message: 'Se actualizó correctamente las variedades',
                titleColor: '#1DC74C',
                color: '#FFF',
                zindex: 2,
              });
                this.updating = false;
            },
            error => {

            }
          )
      } else {
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'Se debe añadir al menos una variedad',
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
        message: 'El campo del título de la variedad debe ser completado',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

}
