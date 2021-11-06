import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  public url;

  constructor(private http: HttpClient) {
    this.url = environment.dbUrl;
  }

  getDistricts(): Observable<any> {
    return this.http.get('./assets/templates/distritos.json');
  };

  getProvinces():  Observable<any> {
    return this.http.get('./assets/templates/provincias.json');
  };

  getCities():  Observable<any> {
    return this.http.get('./assets/templates/regiones.json');
  };

  getShipments(): Observable<any> {
    return this.http.get('./assets/templates/shipments.json');
  };
}
