import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private env = 'http://localhost:3000/api/pagos/generate';

  constructor(private http: HttpClient) {}

  generateSessionToken(requestBody: any): Observable<any> {
    return this.http.post<any>(this.env, requestBody);
  }
}
