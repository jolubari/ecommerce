import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getProducts(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getProductsEcommerce', {
      headers: headers,
    });
  }

  getNewProductsEcommerce(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getNewProductsEcommerce', {
      headers: headers,
    });
  }

  getBestSellerProductsEcommerce(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getBestSellerProductsEcommerce', {
      headers: headers,
    });
  }

  getFilteredProducts(filter: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getFilteredProductsEcommerce/'+filter, {
      headers: headers,
    });
  }

  getProduct(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getProductEcommerce/'+id, {
      headers: headers,
    });
  }

  getDetailsProduct(slug: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getDetailsProductEcommerce/'+slug, {
      headers: headers,
    });
  }

  getRecomendedProductsEcommerce(category: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getRecomendedProductsEcommerce/'+category, {
      headers: headers,
    });
  }
}
