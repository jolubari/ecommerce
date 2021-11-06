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

  registerSaleClient(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(`${this.url}registerSaleClient`, data , {
      headers: headers,
    });
  }

  sendMailSaleClient(idSale: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}sendMailSaleClient/`+idSale , {
      headers: headers,
    });
  }

  validateCoupon(coupon: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}validateCoupon/`+coupon , {
      headers: headers,
    });
  }

}
