import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url;
  private id;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
    this.id = environment.configId;
  }

  getMessages(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getMessages', {
      headers: headers,
    });
  }

  closeMessage(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.put(this.url + 'closeMessage/'+id, data, {
      headers: headers,
    });
  }
}
