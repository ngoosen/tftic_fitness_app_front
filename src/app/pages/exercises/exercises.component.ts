import { Component } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../tools/services/exercise.service';

@Component({
  selector: 'app-exercises',
  standalone: false,
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss'
})
export class ExercisesComponent {
  exercises: Exercise[] = [];

  constructor (private _exerciseService: ExerciseService) {
    _exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
