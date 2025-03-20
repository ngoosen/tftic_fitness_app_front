import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';
import { fakeExercises } from '../../lib/fake-data/exercises.data';
import { fakeMeasures } from '../../lib/fake-data/measures.data';
import { CreateExerciseDTO, Exercise } from '../../models/exercise.model';
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
    if (environment.enableFakeData) {
      this.measures = fakeMeasures;
    } else {
      this._measureService.getMeasures().subscribe({
        next: (data) => {
          this.measures = data;
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  getExercises() {
    if (environment.enableFakeData) {
      this.exercises = fakeExercises;
    } else {
      this._exerciseService.getExercises().subscribe({
        next: (data) => {
          this.exercises = data;
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

  createExercise(newExercise: CreateExerciseDTO) {
    this._exerciseService.createExercise(newExercise).subscribe({
      next: (result) => {
        this.getExercises();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteExercise(exerciseId: string){
    this._exerciseService.deleteExercise(exerciseId).subscribe({
      next: (result) => {
        this.getExercises();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
