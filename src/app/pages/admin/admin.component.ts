import { Component } from '@angular/core';
import { environment } from '../../../environments/environments';
import { fakeExercises } from '../../lib/fake-data/exercises.data';
import { fakeMeasures } from '../../lib/fake-data/measures.data';
import { CreateExerciseDTO, Exercise, UpdateExerciseDTO } from '../../models/exercise.model';
import { CreateMeasureDTO, Measure } from '../../models/measure.model';
import { ExerciseService } from '../../tools/services/exercise.service';
import { MeasureService } from '../../tools/services/measure.service';

enum Tab {
  EXERCISES = "exercises",
  MEASURES = "measures",
  TRAINING_SESSIONS = "training_sessions",
  USERS = "users",
}

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  measures: Measure[] = [];
  exercises: Exercise[] = [];

  displayedTab: Tab = Tab.EXERCISES;

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

  updateExercise(newExercise: UpdateExerciseDTO) {
    this._exerciseService.updateExercise(newExercise).subscribe({
      next: (result) => {
        this.getExercises();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  changeTab(tabname: string) {
    this.displayedTab = tabname as Tab;
  }

  createMeasure(newMeasure: CreateMeasureDTO) {
    this._measureService.createMeasure(newMeasure).subscribe({
      next: (result) => {
        this.getMeasures();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateMeasure(newMeasure: Measure) {
    this._measureService.updateMeasure(newMeasure).subscribe({
      next: (result) => {
        this.getMeasures();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteMeasure(measureId: string) {
    this._measureService.deleteMeasure(measureId).subscribe({
      next: (result) => {
        this.getMeasures();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
