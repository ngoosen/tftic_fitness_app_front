import { Component } from '@angular/core';
import { cleanString } from '../../lib/helpers/cleanString';
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
  displayedExercises: Exercise[] = [];

  constructor (private _exerciseService: ExerciseService) {
    _exerciseService.getExercises().subscribe({
      next: (data) => {
        this.exercises = data;
        this.displayedExercises = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  search(event: any) {
    const value = event.target.value.toLowerCase();

    if (value === "") {
      this.displayedExercises = this.exercises;
    } else {
      this.displayedExercises = this.exercises.filter(exercise => {
        const exerciseName = cleanString(exercise.exercise_name);
        const terms = exerciseName.split(" ");

        let match = false;

        terms.map(term => {
          if (term.startsWith(value)) {
            match = true;
          }
        });

        if (match) {
          return match;
        } else {
          return exerciseName.startsWith(value);
        }
      });
    }
  }
}
