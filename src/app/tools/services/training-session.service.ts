import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs, { Dayjs } from "dayjs";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TrainingSession } from '../../models/training-session.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private _baseUrl = environment.apiUrl;
  private _startTime: Dayjs | undefined;

  currentTrainingSessionId: string | undefined = "467F5BFB-120B-F011-94F9-005056A76538";

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
      user: "6755600D-0004-F011-94F5-005056A76538"
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
