import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getOrdersClient(idClient: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getOrdersClient/`+idClient, {
      headers: headers,
    });
  }

  getDetailsOrderClient(idSale: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getDetailsOrderClient/`+idSale, {
      headers: headers,
    });
  }
}
