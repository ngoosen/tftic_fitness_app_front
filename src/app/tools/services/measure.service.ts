import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { CreateMeasureDTO, Measure } from '../../models/measure.model';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getMeasures(): Observable<Measure[]> {
    return this._http.get<Measure[]>(`${this.baseUrl}/measure`);
  }

  createMeasure(newMeasure: CreateMeasureDTO): Observable<Measure> {
    return this._http.post<Measure>(`${this.baseUrl}/measure`, newMeasure);
  }

  updateMeasure(newMeasure: Measure): Observable<Measure> {
    return this._http.patch<Measure>(`${this.baseUrl}/measure/${newMeasure.id}`, {
      measure_name: newMeasure.measure_name,
      unit: newMeasure.unit,
    });
  }
}
