import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let jQuery: any;
declare let $: any;
@Component({
  selector: 'app-index-contact',
  templateUrl: './index-contact.component.html',
  styleUrls: ['./index-contact.component.scss'],
})
export class IndexContactComponent implements OnInit {
  public messages: Array<any> = new Array<any>();
  public loadingData = true;
  public page = 1;
  public pageSize = 10;
  public filter = '';
  public token;
  public btnDisabled = false;

  constructor(private contactService: ContactService) {
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.contactService.getMessages(this.token).subscribe(
      (response) => {
        this.messages = response.data;
        this.loadingData = false;
      },
      (error) => {}
    );
  }

  closeMessage(id: any) {
    this.btnDisabled = true;
    this.contactService.closeMessage(id, {data: null}, this.token).subscribe(
      () => {
        iziToast.show({
          title: 'SUCCESS',
          class: 'text-success',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'Se cerró correctamente el mensaje',
          titleColor: '#1DC74C',
          color: '#FFF',
          zindex: 2,
        });
        $('#closeModal-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.getMessages();
        this.btnDisabled = false;
      },
      error => {

      }
    )
  }
}
