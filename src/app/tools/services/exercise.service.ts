import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { CreateExerciseDTO, Exercise } from '../../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this._http.get<Exercise[]>(`${this.baseUrl}/exercise`);
  }

  getOneExercise(exerciseId: string): Observable<Exercise> {
    return this._http.get<Exercise>(`${this.baseUrl}/exercise/${exerciseId}`);
  }

  createExercise(newExercise: CreateExerciseDTO): Observable<CreateExerciseDTO> {
    return this._http.post<CreateExerciseDTO>(`${this.baseUrl}/exercise`, newExercise);
  }

  updateExercise(newExercise: Exercise): Observable<Exercise> {
    return this._http.patch<Exercise>(`${this.baseUrl}/exercise/${newExercise.id}`, newExercise);
  }

  deleteExercise(exerciseId: string): Observable<Exercise> {
    return this._http.delete<Exercise>(`${this.baseUrl}/exercise/${exerciseId}`);
  }
}
