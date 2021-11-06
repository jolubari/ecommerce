import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { IziToast, IziToastSettings } from 'izitoast';
// declaracion variables jQuery
declare let jQuery: any;
declare let $: any;
declare let iziToast: IziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any = {
    email: '',
    password: ''
  };
  public validUser: any = {};
  public token: string | null = '';


  constructor(private loginService: LoginService, private router: Router) { 
    // $('body').attr('style', 'background:#000 !important'); // Jquery volviendo el fondo del login negro
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
    if (this.token) { // si el usuario ya ha iniciado sesion y mete la url del login lo redirijo al home
      this.router.navigate(['/']);
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const data = {
        email: this.user.email,
        password: this.user.password
      }
      this.loginService.login(data).subscribe( response => {
        if (response.data === undefined) {
          iziToast.show( {
            title: 'ERROR',
            class: 'text-danger',
            position: 'topRight',
            message: response.message,
            titleColor: '#FF0000',
            color: '#FFF',
          } )
        } else {
          this.validUser = response.data;
          // guardar el token y el id del usuario en el localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('_id', response.data._id);

          this.router.navigate( ['/'] );
        }
      },
      (error) => {
        console.error('error -> ', error);
      });
    } else {
      iziToast.show( {
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos',
        titleColor: '#FF0000',
        color: '#FFF'
      } )
    }
  }

}
