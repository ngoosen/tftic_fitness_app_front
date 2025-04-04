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
  trainingSessions: FullTrainingSessionData[] = [];//

  trainingSessionId: string | undefined;
  trainingSessionData!: FullTrainingSessionData;
  measures: string[] = [];

  displayDeletePopup: boolean = false;
  exerciseToDeleteId: string = "";
  trainingSessionToDeleteId: string = "";

  displayUpdateDescription: boolean = false;
  descriptionToUpdate: string = "Ajouter une description";

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
    }
  }

  getSession(sessionId: string) {
    this._trainingSessionService.getTrainingSessionById(sessionId).subscribe({
      next: (data) => {
        this.trainingSessionData = data;
        if (data.description !== "") {
          this.descriptionToUpdate = data.description;
        }

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
        this.exerciseToDeleteId = "";
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
    if (this.descriptionToUpdate === "Ajouter une description") {
      this.toggleDescriptionUpdate();
      return;
    }

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
