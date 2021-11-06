import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  registerAddress(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(`${this.url}registerAddress`, data , {
      headers: headers,
    });
  }

  getClientAddresses(idClient: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getClientAddresses/`+idClient, {
      headers: headers,
    });
  }

  updatePrincipalAddress(idAddress: any, idClient: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(`${this.url}updatePrincipalAddress/`+idAddress+'/'+idClient, {data:true}, { // el put necesita que se envie data , como no la necesitamos en el controller mandamos un true por enviar algo
      headers: headers,
    });
  }

  getPrincipalAddressClient(idClient: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getPrincipalAddressClient/`+idClient, {
      headers: headers,
    });
  }
}
