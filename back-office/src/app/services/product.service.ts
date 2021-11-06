import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  registerProduct(data: any, file: any , token: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('stock', data.stock);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('cover', file);

    return this.http.post(this.url + 'registerProduct/',formData, {
      headers: headers,
    });
  }

  getProducts(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getProducts', {
      headers: headers,
    });
  }

  getFilteredProducts(filter: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getFilteredProducts/'+filter, {
      headers: headers,
    });
  }

  getProduct(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getProduct/'+id, {
      headers: headers,
    });
  }

  updateProduct(data: any, id: any, token: any): Observable<any> {
    if (data.cover) {
      let headers = new HttpHeaders({'Authorization': token});
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('stock', data.stock);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('content', data.content);
      formData.append('category', data.category);
      formData.append('cover', data.cover);
  
      return this.http.put(this.url + 'updateProduct/'+id,formData, {
        headers: headers,
    });
    } else {
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
      return this.http.put(this.url + 'updateProduct/'+id,data, {
        headers: headers,
      });
    }
  }

  deleteProduct(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(this.url + 'deleteProduct/'+id, {
      headers: headers,
    });
  }


  getBalanceProduct(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getBalanceProduct/'+id, {
      headers: headers,
    });
  }

  deleteBalanceProduct(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(this.url + 'deleteBalanceProduct/'+id, {
      headers: headers,
    });
  }

  registerBalanceProduct(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(this.url + 'registerBalanceProduct/',data, {
      headers: headers,
    });
  }

  updateVarietiesProduct(id: any, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(this.url + 'updateVarietiesProduct/'+id,data, {
      headers: headers,
    });
  }

  addImageGalleryProduct(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('_id', data._id);
    formData.append('image', data.image);

    return this.http.put(this.url + 'addImageGalleryProduct/'+id, formData, {
      headers: headers,
    });
  }

  deleteImageGalleryProduct(id: any, data: any, token: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(this.url + 'deleteImageGalleryProduct/'+id,data, {
      headers: headers,
    });
  }
  
}
