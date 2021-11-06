import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IziToast } from 'izitoast';
import { ClientService } from '../../../services/client.service';
import { LoginService } from '../../../services/login.service';
declare const iziToast: IziToast;
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  public client: any = {
    gender: '',
  };
  public token;
  public btnDisabled = false;
  constructor(
    private clientService: ClientService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {}

  register(form: any) {
    if (form.valid) {
      this.btnDisabled = true;
      this.clientService.registerClient(this.client, this.token).subscribe(
        () => {
          iziToast.show({
            title: 'SUCCESS',
            class: 'text-success',
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            message: 'Se registro correctamente el cliente',
            titleColor: '#1DC74C',
            color: '#FFF',
            zindex: 2,
          });
          this.client = {
            first_name: '',
            second_name: '',
            first_surname: '',
            second_surname: '',
            email: '',
            phone: '',
            bornDate: '',
            identity_document: '',
            gender: '',
          };
          this.btnDisabled = false;
          this.router.navigate(['/panel/clients']);
        },
        (error) => {
          console.log('error:', error);
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
    }
  }
}
