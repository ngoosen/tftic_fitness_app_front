import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullTrainingSessionData } from '../../models/training-session.model';
import { TrainingSessionService } from '../../tools/services/training-session.service';

@Component({
  selector: 'app-training-session',
  standalone: false,
  templateUrl: './training-session.component.html',
  styleUrl: './training-session.component.scss'
})
export class TrainingSessionComponent {
  trainingSessionId: string | undefined;
  trainingSessionData!: FullTrainingSessionData;
  measures: string[] = [];

  displayDeletePopup: boolean = false;
  exerciseToDeleteId: string = "";

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _trainingSessionService: TrainingSessionService
  ) {
    const paramId = _activatedRoute.snapshot.params["id"];

    if (paramId) {
      this.trainingSessionId = paramId;
      this.getCurrentSession();
    } else {
      const serviceId = _trainingSessionService.currentTrainingSessionId;

      if (serviceId) {
        _router.navigate(["/training-session", serviceId]);
      }
    }
  }

  getCurrentSession() {
    this._trainingSessionService.getCurrentTrainingSession().subscribe({
      next: (data) => {
        this.trainingSessionData = data;
        console.log("🚀 ~ TrainingSessionComponent ~ this._trainingSessionService.getCurrentTrainingSession ~ data:", data);

        data.exercises.forEach(exercise => {
          exercise.series.forEach(series => {
            if (this.measures.length === 0) {
              this.measures = series.measures.map(measure => measure.measure.measure_name);
            }
          });
        });
      },
      error: (e) => {
        console.log(e);
      },
    })
  }

  startTrainingSession() {
    this._trainingSessionService.startTrainingSession().subscribe({
      next: (result) => {
        this._trainingSessionService.setSessionId(result.id);
        this._router.navigate(["/training-session", result.id]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addExercise() {
    this._router.navigate(["/exercise"]);
  }

  removeExercise(id: string) {
    this.displayDeletePopup = true;
    this.exerciseToDeleteId = id;
  }

  confirmRemoveExercise() {
    this._trainingSessionService.removeExercise(this.exerciseToDeleteId).subscribe({
      next: (result) => {
        this.getCurrentSession();
      } ,
      error: (e) => {
        console.log(e);
      }
    });
  }
}
