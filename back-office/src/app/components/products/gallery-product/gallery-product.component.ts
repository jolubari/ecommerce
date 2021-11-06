import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid'; // uuid instalada con npm i --save-dev @types/uuid
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare const $: any;
@Component({
  selector: 'app-gallery-product',
  templateUrl: './gallery-product.component.html',
  styleUrls: ['./gallery-product.component.scss']
})
export class GalleryProductComponent implements OnInit {

  public product: any = {};
  public id: any;
  public token: any;
  public file?: File;
  public url;
  public updating= false;
  public btnDisabled = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadData();
    });
   }

  ngOnInit(): void {
  }

  loadData(){
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
  }

  addImage(){
    if (this.file) {
      let data = {
        image: this.file,
        _id: uuidv4() // generamos id unico
      };
      this.productService.addImageGalleryProduct(this.id, data, this.token).subscribe(
        () => {
          $('#input-imagen').val('');
          this.loadData();
        },
        error => {

        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        message: 'Error al guardar la imagen',
        titleColor: '#FF0000',
        color: '#FFF',
        zindex: 2,
      });
    }
  }

  fileChangeEvent(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      if (file.size <= 4000000) { // menor a 4mb
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif'|| file.type === 'image/jpeg') {
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
          this.file = undefined;
          $('#input-imagen').val('');
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
        this.file = undefined;
        $('#input-imagen').val('');
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
      this.file = undefined;
    }
  }

  deleteImage(id:any) {
    this.btnDisabled = true;
      this.productService.deleteImageGalleryProduct(this.id,{_id:id}, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se eliminó correctamente la imagen',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
          $('#delete-'+id).modal('hide');
          $('.modal-backdrop').removeClass('show');
          this.btnDisabled = false;
          this.loadData();
        },
        error => {
          this.btnDisabled = false;
          iziToast.show({
            title: 'ERROR',
            class: 'text-danger',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Ha ocurrido un error durante el borrado',
            titleColor: '#FF0000',
            color: '#FFF',
            zindex: 2,
          });
        }
      )
    }

}
