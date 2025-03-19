import { Component, Input, SimpleChanges } from '@angular/core';
import { cleanString } from '../../../../lib/helpers/cleanString';
import { Exercise } from '../../../../models/exercise.model';

@Component({
  selector: 'app-exercise-list',
  standalone: false,
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
  displayedExercises: Exercise[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes["exercises"]) {
      this.displayedExercises = this.exercises;
    }
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
