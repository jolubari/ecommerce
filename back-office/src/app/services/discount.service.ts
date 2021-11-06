import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  registerDiscount(data: any, file: any , token: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('banner', file);
    formData.append('discount', data.discount);
    formData.append('init_date', data.init_date);
    formData.append('end_date', data.end_date);  

    return this.http.post(this.url + 'registerDiscount/',formData, {
      headers: headers,
    });
  }

  getDiscount(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getDiscount/'+id, {
      headers: headers,
    });
  }

  getDiscounts(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getDiscounts', {
      headers: headers,
    });
  }

  getFilteredDiscounts(filter: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getFilteredDiscounts/'+filter, {
      headers: headers,
    });
  }

  updateDiscount(data: any, id: any, token: any): Observable<any> {
    if (data.banner) {
      let headers = new HttpHeaders({'Authorization': token});
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('banner', data.banner);
      formData.append('discount', data.discount);
      formData.append('init_date', data.init_date);
      formData.append('end_date', data.end_date);  
  
      return this.http.put(this.url + 'updateDiscount/'+id,formData, {
        headers: headers,
    });
    } else {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this.http.put(this.url + 'updateDiscount/'+id,data, {
        headers: headers,
      });
    }
  }

  deleteDiscount(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(this.url + 'deleteDiscount/'+id, {
      headers: headers,
    });
  }
  
}

