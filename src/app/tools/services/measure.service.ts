import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Measure } from '../../models/measure.model';

const { API_MAIN_PATH } = process.env;

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(private _http: HttpClient) { }

  getMeasures(): Observable<Measure[]> {
    return this._http.get<Measure[]>(`${API_MAIN_PATH}/measure`);
  }
}
