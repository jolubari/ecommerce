import { Component, OnInit } from '@angular/core';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { ClientService } from '../../../services/client.service';
declare const jQuery: any; // npm install jquery
declare const $: any;
declare const iziToast: IziToast;
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  public client: any = {};
  public id:any;
  public token: any;
  public newPass: any;
  constructor(private clientService: ClientService) { 
    this.id = localStorage.getItem('_id');
    this.token = localStorage.getItem('token');
    if (this.id && this.token) {
      this.clientService.getClient(this.id, this.token).subscribe(
        response => {
          this.client = response.data;
        },
        error => {

        }
      )
    }
  }

  ngOnInit(): void {
  }


  updateProfile(form:any){
    if (form.valid) {
      this.client.password = $('#input_password').val();
      this.clientService.updateClient(this.id, this.client, this.token).subscribe(
        response => {
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position:'center',
            message:'se actualizo su perfil correctamente'
          })
        },
        error => {}
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
