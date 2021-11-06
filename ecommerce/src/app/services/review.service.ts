import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  emitReviewProduct(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(`${this.url}emitReviewProduct`, data , {
      headers: headers,
    });
  }

  getReviewProduct(id: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${this.url}getReviewProduct/`+id , {
      headers: headers,
    });
  }

  getReviewsProduct(idProduct: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + 'getReviewsProduct/'+idProduct, {
      headers: headers,
    });
  }

  getReviewsClient(idClient: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getReviewsClient/`+idClient , {
      headers: headers,
    });
  }
}
