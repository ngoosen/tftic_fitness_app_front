import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../models/exercise.model';
import { AddExerciseToTrainingDTO } from '../../models/training-session.model';
import { ExerciseService } from '../../tools/services/exercise.service';
import { TrainingSessionService } from '../../tools/services/training-session.service';

@Component({
  selector: 'app-exercise',
  standalone: false,
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss'
})
export class ExerciseComponent {
  exercise!: Exercise;
  steps: string[] = [];

  displaySeries: boolean = false;
  enteredValues: {
    id: string,
    unit: string,
    value: number,
  }[][] = [];

  constructor (
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService,
    private _trainingSessionService: TrainingSessionService,
  ) { }

  ngOnInit() {
    const exerciseId = this._activatedRoute.snapshot.params["id"];

    this._exerciseService.getOneExercise(exerciseId).subscribe({
      next: (data) => {
        this.exercise = data;
        this.steps = data.description
          .split(".")
          .map(text => text + ".")
          .slice(0, -1);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  toggleSeries() {
    this.displaySeries = !this.displaySeries;
  }

  cancel() {
    this.displaySeries = false;
    this.enteredValues = [];
  }

  addSeries() {
    const cell = this.exercise.trackable_measures.map(measure => {
      let value = 0;

      if (this.enteredValues.length > 0) {
        const previousSeries = this.enteredValues.slice(-1)[0];
        const previousValue = previousSeries.find(v => v.id === measure.id);

        if (previousValue) {
          value = previousValue.value;
        }
      }

      return {
        id: measure.id,
        unit: measure.unit,
        value,
      };
    });

    let value = 0;

    if (this.enteredValues.length > 0) {
      const previousSeries = this.enteredValues.slice(-1)[0];
      const previousValue = previousSeries.find(v => v.id === "rep");

      if (previousValue) {
        value = previousValue.value;
      }
    }

    cell.push({
      id: "rep",
      unit: "",
      value,
    });

    this.enteredValues.push(cell);
  }

  removeSeries(index: number) {
    this.enteredValues.splice(index, 1);
  }

  addExerciseToTrainingSession() {
    const series = this.enteredValues.map(value => {
      const reps = value.find(v => v.unit === "rep")?.value ?? 0;
      const measures = value.filter(v => v.unit !== "rep").map(v => {
        return {
          id: v.id,
          measure_quantity: v.value,
        }
      });

      return {
        reps,
        measures,
      }
    });

    const newExercise: AddExerciseToTrainingDTO = {
      exerciseId: this.exercise.id,
      series,
    };

    this._trainingSessionService.addDataToTrainingSession(newExercise).subscribe({
      next: (result) => {
        this._router.navigate(["/training-session"]);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
