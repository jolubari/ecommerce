import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getClients(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getClients', {
      headers: headers,
    });
  }

  getFilteredClients(filterType: any, filter: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getFilteredClients/'+filterType+'/'+filter, {
      headers: headers,
    });
  }

  registerClient(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.post(this.url + 'registerClient/',data, {
      headers: headers,
    });
  }

  getClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getClient/'+id, {
      headers: headers,
    });
  }

  updateClient(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(this.url + 'updateClient/'+id,data, {
      headers: headers,
    });
  }

  deleteClient(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.delete(this.url + 'deleteClient/'+id, {
      headers: headers,
    });
  }
}
