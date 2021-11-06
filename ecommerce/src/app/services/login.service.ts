import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt'; // npm i @auth0/angular-jwt

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  login(userData: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login/', userData, {
      headers: headers,
    });
  }

  public getToken(): string | null {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  public isAuthenticated(): boolean {
    const token: string = JSON.stringify(localStorage.getItem('token')!);
    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token); // decodificar un token

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
