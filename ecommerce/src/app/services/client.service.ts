import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(`${this.url}getClientEcommerce/${id}`, {
      headers: headers,
    });
  }

  updateClient(id: any, data:any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(`${this.url}updateClientEcommerce/${id}`, data, {
      headers: headers,
    });
  }
}
