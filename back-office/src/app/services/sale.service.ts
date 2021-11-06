import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getSales(fromDate: any, toDate: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getSales/'+ fromDate + '/' + toDate, {
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
