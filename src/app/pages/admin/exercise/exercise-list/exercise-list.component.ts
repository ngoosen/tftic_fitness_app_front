import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  @Output() onUpdate: EventEmitter<Exercise>;
  @Output() onDelete: EventEmitter<string>;

  displayedExercises: Exercise[] = [];
  displayExercise: string = "";

  exerciseToDeleteId: string = "";
  exerciseToDeleteName: string = "";

  constructor () {
    this.onUpdate = new EventEmitter<Exercise>;
    this.onDelete = new EventEmitter<string>;
  }

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

  toggleExercise(exerciseId: string) {
    if (this.displayExercise === exerciseId) {
      this.displayExercise = "";
    } else {
      this.displayExercise = exerciseId;
    }
  }

  updateExerciseHandler(exerciseId: string) {
    //TODO: implement
    console.log("🚀 ~ ExerciseListComponent ~ updateExercise ~ exerciseId:", exerciseId);
  }

  deleteExerciseHandler(exerciseId: string) {
    this.exerciseToDeleteId = exerciseId;
    this.exerciseToDeleteName = this.exercises.find(e => e.id === exerciseId)?.exercise_name ?? "";
  }

  cancelDelete() {
    this.exerciseToDeleteId = "";
    this.exerciseToDeleteName = "";
  }

  confirmDelete() {
    this.onDelete.emit(this.exerciseToDeleteId);
    this.cancelDelete();
  }
}
