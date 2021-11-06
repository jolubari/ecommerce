import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  public url;
  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getMonthlyEarningsKPI(token: any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this.http.get(this.url + 'getMonthlyEarningsKPI', {
      headers: headers,
    });
  }
}
