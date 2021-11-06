import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  addCartClient(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(`${this.url}addCartClient`, data,  {
      headers: headers,
    });
  }

  getCartClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getCartClient/${id}`,  {
      headers: headers,
    });
  }

  deleteItemToCartClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(`${this.url}deleteItemToCartClient/${id}`,  {
      headers: headers,
    });
  }

}
