import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs, { Dayjs } from "dayjs";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { FullTrainingSessionData, TrainingSession } from '../../models/training-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private _baseUrl = environment.apiUrl;
  private _startTime: Dayjs | undefined;
  private _userId: string = "6755600D-0004-F011-94F5-005056A76538";

  currentTrainingSessionId: string | undefined = "6855600D-0004-F011-94F5-005056A76538";
  // currentTrainingSessionId: string | undefined;

  constructor(private _http: HttpClient) { }

  getAllTrainingSessions(): Observable<FullTrainingSessionData> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData>(`${this._baseUrl}/training-session/${this._userId}`);
  }

  getCurrentTrainingSession(): Observable<FullTrainingSessionData> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData>(`${this._baseUrl}/training-session/${this._userId}/${this.currentTrainingSessionId}`);
  }

  getTrainingSessionById(sessionId: string): Observable<FullTrainingSessionData> {
    //TODO: update user id
    return this._http.get<FullTrainingSessionData>(`${this._baseUrl}/training-session/${this._userId}/${sessionId}`);
  }

  removeExercise(trainingSessionExerciseId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/training-session-exercise/${trainingSessionExerciseId}`);
  }

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
}
