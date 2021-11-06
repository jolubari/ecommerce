import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  sendMessage(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'sendMessage', data, {
      headers: headers,
    });
  }
}
