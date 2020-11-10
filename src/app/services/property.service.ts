import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {

  private readonly HOST_FRONT = 'localhost:4200';
  private readonly PROPERTY_URL = `${environment.apiUrl}/sources`;

  constructor(private http: HttpClient) { }

  private headers(): HttpHeaders {
    return new HttpHeaders().set('Access-Control-Allow-Origin', this.HOST_FRONT);
  }

  search(): Observable<Property[]> {
    let endpoint = `${this.PROPERTY_URL}/source-1.json`;
    return this.http.get(endpoint, {
      headers: this.headers()
    }).pipe(map(data => <Property[]>data))
  }
}
