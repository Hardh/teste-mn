import {
  Observable
} from 'rxjs';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {

  constructor(private http: HttpClient) {}

  search() {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'localhost:4200');
    let apiURL = `${environment.apiUrl}/sources/source-1.json`
    return this.http.get(apiURL, {
      headers: headers
    })
  }

}
