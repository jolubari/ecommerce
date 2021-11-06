import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { LoginService } from '../../../services/login.service';
import { IziToast } from 'izitoast';
declare const iziToast: IziToast;
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  public client: any = {};
  public id = '';
  public token;
  public btnDisabled = false;
  public loadingData = true;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.clientService.getClient(this.id, this.token).subscribe(
        (response) => {
          if (response.data === undefined) {
            this.client = undefined;
            this.loadingData = false;
          } else {
            this.client = response.data;
            this.loadingData = false;
          }
        },
        (error) => {}
      );
    });
  }

  update(form: any) {
    if (form.valid) {
      this.btnDisabled = true;
      this.clientService
        .updateClient(this.id, this.client, this.token)
        .subscribe(
          () => {
            iziToast.show({
              title: 'SUCCESS',
              class: 'text-success',
              position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
              message: 'Se actualizó correctamente el cliente',
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
          (error) => {}
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
