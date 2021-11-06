import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router){}

  canActivate(){
    if (!this.loginService.isAuthenticated()) {
        this.router.navigate(['/login']); // si no esta autenticado redireccionamos al login
        return false;
    } else {
      return true
    }
  }
  
}

