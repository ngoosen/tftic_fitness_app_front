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
  trainingSessions: FullTrainingSessionData[] = [];

  trainingSessionId: string | undefined;
  trainingSessionData!: FullTrainingSessionData;
  measures: string[] = [];

  displayDeletePopup: boolean = false;
  exerciseToDeleteId: string = "";

  displayUpdateDescription: boolean = false;
  descriptionToUpdate: string = "";

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _trainingSessionService: TrainingSessionService,
  ) { }

  ngOnInit() {
    const paramId = this._activatedRoute.snapshot.params["id"];

    if (paramId) {
      this.trainingSessionId = paramId;
      this.getSession(paramId);
    } else {
      const serviceId = this._trainingSessionService.currentTrainingSessionId;

      if (serviceId) {
        this._router.navigate(["/training-session", serviceId]);
      } else {
        this._trainingSessionService.getAllTrainingSessions().subscribe({
          next: (result) => {
            this.trainingSessions = result;
          }
        })
      }
    }
  }

  getSession(sessionId: string) {
    this._trainingSessionService.getTrainingSessionById(sessionId).subscribe({
      next: (data) => {
        this.trainingSessionData = data;
        console.log("🚀 ~ TrainingSessionComponent ~ this._trainingSessionService.getCurrentTrainingSession ~ data:", data);
        this.descriptionToUpdate = data.description;

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
        if (this.trainingSessionId) {
          this.getSession(this.trainingSessionId);
        }

        this.displayDeletePopup = false;
      } ,
      error: (e) => {
        console.log(e);
      }
    });
  }

  toggleDescriptionUpdate() {
    this.displayUpdateDescription = !this.displayUpdateDescription;
  }

  updateDescription() {
    this._trainingSessionService.updateTrainingSession({
      ...this.trainingSessionData,
      description: this.descriptionToUpdate,
    }).subscribe({
      next: (result) => {
        this.toggleDescriptionUpdate();
        this.trainingSessionData.description = this.descriptionToUpdate;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
