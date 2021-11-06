import { Component, OnInit } from '@angular/core';
import { IziToast } from 'izitoast'; // npm install izitoast --save
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
declare const jQuery: any;
declare const $: any;
declare const iziToast: IziToast;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public loggedUser: any = {};
  public token;
  constructor(private loginService: LoginService, private router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      router.navigate(['/']);
    }
   }

  ngOnInit(): void {
  }

  login(form: any) {
    if (form.valid) {
      const data = {
        email: this.user.email,
        password: this.user.password
      };
      this.loginService.login(data).subscribe(
        response => {
          if (!response.data) {
            iziToast.show({
              title: 'ERROR',
              class: 'text-danger',
              position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
              message: response.message,
              titleColor: '#FF0000',
              color: '#FFF',
              zindex: 2,
            });
          } else {
            this.loggedUser = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this.router.navigate(['/']);
          }
        },
        error => {

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
