import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getConfigEcommerce(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getConfigEcommerce/', {
      headers: headers,
    });
  }

}