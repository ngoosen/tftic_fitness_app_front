import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs, { Dayjs } from "dayjs";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { AddExerciseToTrainingDTO, AddExerciseToTrainingResult, FullTrainingSessionData, TrainingSession, TrainingSessionByExerciseId } from '../../models/training-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private _baseUrl = environment.apiUrl;
  private _startTime: Dayjs | undefined;
  private _userId: string = "6755600D-0004-F011-94F5-005056A76538";

  currentTrainingSessionId: string | undefined = "3D2947FC-2A0E-F011-94F9-005056A76538";
  // currentTrainingSessionId: string | undefined;

  constructor(private _http: HttpClient) { }

  setSessionId(id: string) {
    this.currentTrainingSessionId = id;
  }

  startTrainingSession(): Observable<TrainingSession> {
    const body = {
      training_date: new Date(),
      duration: "",
      description: "",
      //TODO: update user id
      user: this._userId,
    };

    this._startTime = dayjs();

    return this._http.post<TrainingSession>(`${this._baseUrl}/training-session`, body);
  }

  stopTrainingSession() {
    const now = dayjs();
    const diff = now.diff(this._startTime); // format in milliseconds
    console.log("🚀 ~ TrainingSessionService ~ stopTrainingSession ~ diff:", diff);

    //TODO: update training session data

    this._startTime = undefined;
    this.currentTrainingSessionId = undefined;
  }

  getAllTrainingSessions(): Observable<FullTrainingSessionData[]> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData[]>(`${this._baseUrl}/training-session/${this._userId}`);
  }

  getCurrentTrainingSession(): Observable<FullTrainingSessionData> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData>(`${this._baseUrl}/training-session/${this._userId}/${this.currentTrainingSessionId}`);
  }

  getTrainingSessionById(sessionId: string): Observable<FullTrainingSessionData> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData>(`${this._baseUrl}/training-session/${this._userId}/${sessionId}`);
  }

  deleteTrainingSession(trainingSessionId: string): Observable<any> {
    //TODO: update user id
    return this._http.delete(`${this._baseUrl}/training-session/${this._userId}/${trainingSessionId}`);
  }

  getByExerciseId(exerciseId: string): Observable<TrainingSessionByExerciseId[]> {
    return this._http.get<TrainingSessionByExerciseId[]>(`${this._baseUrl}/training-session-exercise/${exerciseId}`);
  }

  updateTrainingSession(newSession: TrainingSession): Observable<any> {
    return this._http.patch(`${this._baseUrl}/training-session/${newSession.id}`, {
      training_date: newSession.training_date,
      duration: newSession.duration,
      description: newSession.description,
    });
  }

  removeExercise(trainingSessionExerciseId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/training-session-exercise/${trainingSessionExerciseId}`);
  }

  addDataToTrainingSession(data: AddExerciseToTrainingDTO, trainingSessionId = this.currentTrainingSessionId): Observable<AddExerciseToTrainingResult[][]> {
    if (!trainingSessionId) {
      this.startTrainingSession().subscribe({
        next: (result) => {
          this.currentTrainingSessionId = result.id;
          trainingSessionId = result.id;
        },
        error: (e) => {
          console.log(e);
        }
      });
    }

    const body = {
      training_session_id: trainingSessionId,
      exercise_id: data.exerciseId,
      series: data.series.map(sery => {
        return {
          reps: sery.measures.find(measure => measure.id === "rep")?.measure_quantity,
          measures: sery.measures.filter(measure => measure.id !== "rep"),
        }
      }),
    };

    return this._http.post<AddExerciseToTrainingResult[][]>(`${this._baseUrl}/training-session-exercise/full`, body);
  }
}
