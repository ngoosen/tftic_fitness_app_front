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
  enteredValues: Record<string, { name: string, value: number}>[][] = [];

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

  addSeries() {
    const cell = this.exercise.trackable_measures.map(measure => {
      return {
        [measure.id]: {
          name: measure.measure_name,
          value: 0,
        },
      };
    });

    this.enteredValues.push(cell);
    console.log("🚀 ~ ExerciseComponent ~ addSeries ~ this.enteredValues:", this.enteredValues);
  }
}
