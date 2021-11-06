import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getActiveDiscount(): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.url}getActiveDiscount/` , {
      headers: headers,
    });
  }
}
