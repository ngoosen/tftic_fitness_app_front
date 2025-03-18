import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Measure } from '../../models/measure.model';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMeasures(): Observable<Measure[]> {
    return this._http.get<Measure[]>(`${this.baseUrl}/measure`);
  }
}
