import { Component } from '@angular/core';
import { fakeExercises } from '../../lib/fake-data/exercises.data';
import { fakeMeasures } from '../../lib/fake-data/measures.data';
import { Exercise } from '../../models/exercise.model';
import { Measure } from '../../models/measure.model';
import { ExerciseService } from '../../tools/services/exercise.service';
import { MeasureService } from '../../tools/services/measure.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  measures: Measure[] = [];
  exercises: Exercise[] = [];

  constructor (
    private _measureService: MeasureService,
    private _exerciseService: ExerciseService
  ) {
    this.getMeasures();
    this.getExercises();
  }

  getMeasures() {
    this._measureService.getMeasures().subscribe({
      next: (data) => {
        this.measures = data;
      },
      error: (e) => {
        console.log(e);
        this.measures = fakeMeasures;
      },
    })
  }

  getExercises() {
    this._exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
      },
      error: (e) => {
        console.log(e);
        this.exercises = fakeExercises;
      }
    });
  }
}
