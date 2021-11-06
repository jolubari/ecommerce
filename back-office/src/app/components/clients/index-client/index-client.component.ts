import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.scss'],
})
export class IndexClientComponent implements OnInit {
  public clients: Array<any> = new Array<any>();
  public firstSurnameFilter = '';
  public emailFilter = '';
  public page = 1;
  public pageSize = 10;
  public token;
  public loadingData = true;

  constructor(private clientService: ClientService, private loginService: LoginService) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients(this.token).subscribe(
      (response) => {
        this.clients = response.data;
        this.loadingData = false;
      },
      (error) => {
        console.log('error -> ', error);
      }
    );
  }

  getFilteredClients(filterType: any, filter: any) {
    this.clientService.getFilteredClients(filterType, filter, this.token).subscribe(
      (response) => {
        this.clients = response.data;
        this.loadingData = false;  
      },
      (error) => {
        console.log('error -> ', error);
      }
    );
  }

  filter(filterType: any) {
    this.loadingData = true;
    let filter;
    if (filterType === 'firstSurname') {
      filter = this.firstSurnameFilter;  
    }
    if (filterType === 'email') {
      filter = this.emailFilter;
    }
    this.getFilteredClients(filterType, filter);
  }

  deleteClient(id: any) {
    this.clientService.deleteClient(id, this.token).subscribe(
      () => {
        iziToast.show({
          title: 'SUCCESS',
          class: 'text-success',
          position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
          message: 'Se eliminó correctamente el cliente',
          titleColor: '#1DC74C',
          color: '#FFF',
          zindex: 2,
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.getClients();
      },
      error => {

      }
    )
  }
}
