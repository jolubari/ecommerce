import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { IziToast } from 'izitoast';
import { v4 as uuidv4 } from 'uuid'; // uuid instalada con npm i --save-dev @types/uuid
import { environment } from 'src/environments/environment';
// declaracion variable jQuery
declare let $: any;
declare let iziToast: IziToast;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public token;
  public config: any = {};
  public titleCategory = '';
  public iconCategory = '';
  public file?: File;
  public imgSelected: any | ArrayBuffer;
  public url;
  constructor(private configService: ConfigService) {
    this.token = localStorage.getItem('token');
    this.url = environment.dbUrl;
    this.getConfig();
   }

  ngOnInit(): void {}

  getConfig(){
    this.configService.getConfig(this.token).subscribe(
      response => {
        this.config = response.data;
        this.imgSelected = `${this.url}getLogoEcommerce/${this.config.logo}`;
      },
      error => {

      }
    )
  }

  addCategory(){
    if (this.titleCategory && this.iconCategory) {
      this.config.categories.push(
        {
          title: this.titleCategory,
          icon: this.iconCategory,
          _id: uuidv4()
        }
      );
      this.titleCategory = '';
      this.iconCategory = '';
    } else {
      iziToast.show( {
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria',
        titleColor: '#FF0000',
        color: '#FFF'
      } )
    }
  }

  updateConfig(form: any) {
    if (form.valid) {
      let data = {
        business_name: form.value.business_name,
        serial_number: form.value.serial_number,
        correlative_number: form.value.correlative_number,
        categories: this.config.categories,
        logo: this.file
      };
      this.configService.updateConfig(data, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se actualizó correctamente la configuración',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
        },
        error => {

        }
      )
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
    }
  }

  fileChangeEvent(event:any){
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      if (file.size <= 4000000) { // menor a 4mb
        if (file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif'|| file.type === 'image/jpeg') {
          const reader = new FileReader();
          reader.onload = () => this.imgSelected = reader.result; // imagen en BASE64
          $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
          $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
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

  ngDoCheck():void {
    $('.cs-file-drop-preview').html('<img src='+this.imgSelected+'>');
  }

  deleteCategory(indexItem:any){
    this.config.categories.splice(indexItem,1);
  }

}
