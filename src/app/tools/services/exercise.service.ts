import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Exercise } from '../../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this._http.get<Exercise[]>(`${this.baseUrl}/exercise`);
  }
}
