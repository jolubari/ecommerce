import { Component, OnInit } from '@angular/core';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { ContactService } from '../../services/contact.service';

declare const jQuery: any;
declare const $: any;
declare const iziToast: IziToast;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contact: any = {};
  public btnDisabled = false;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  sendMessage(form: any){
    if (form.valid) {
      this.btnDisabled = true;
      this.contactService.sendMessage(this.contact).subscribe(
        response => {
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position:'center',
            message:'Se envió correctamente el mensaje'
          });
          this.contact = {};
          this.btnDisabled = false;
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

}
