import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private url;
  private id;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
    this.id = environment.configId;
  }

  getConfig(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getConfig', {
      headers: headers,
    });
  }

  updateConfig(data: any, token: any): Observable<any> {
    if (data.logo) {
      const headers = new HttpHeaders({'Authorization': token});
      const formData = new FormData();
      formData.append('business_name', data.business_name);
      formData.append('serial_number', data.serial_number);
      formData.append('correlative_number', data.correlative_number);
      formData.append('categories', JSON.stringify(data.categories)); // para que no lo envie como object
      formData.append('logo', data.logo);
  
      return this.http.put(this.url + 'updateConfig/'+this.id,formData, {
        headers: headers,
    });
    } else {
      const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this.http.put(this.url + 'updateConfig/'+this.id,data, {
        headers: headers,
      });
    }

  }

  getConfigEcommerce(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getConfigEcommerce/', {
      headers: headers,
    });
  }

}
