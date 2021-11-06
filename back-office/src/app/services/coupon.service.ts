import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CouponService {
  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }
  registerCoupon(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(this.url + 'registerCoupon',data, {
      headers: headers,
    });
  };

  getCoupons(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getCoupons', {
      headers: headers,
    });
  }

  getFilteredCoupons(filter: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getFilteredCoupons/'+filter, {
      headers: headers,
    });
  }

  getCoupon(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getCoupon/'+id, {
      headers: headers,
    });
  }

  updateCoupon(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(this.url + 'updateCoupon/'+id,data, {
      headers: headers,
    });
  }

  deleteCoupon(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(this.url + 'deleteCoupon/'+id, {
      headers: headers,
    });
  }
}
