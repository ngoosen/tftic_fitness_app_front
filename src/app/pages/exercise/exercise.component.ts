import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../tools/services/exercise.service';

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
    private _exerciseService: ExerciseService
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
      return {
        id: measure.id,
        unit: measure.unit,
        value: 0,
      };
    });

    cell.push({
      id: "rep",
      unit: "",
      value: 0,
    });

    this.enteredValues.push(cell);
  }

  removeSeries(index: number) {
    this.enteredValues.splice(index, 1);
  }
}
