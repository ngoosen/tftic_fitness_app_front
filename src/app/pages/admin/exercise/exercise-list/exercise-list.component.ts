import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { cleanString } from '../../../../lib/helpers/cleanString';
import { Exercise, UpdateExerciseDTO } from '../../../../models/exercise.model';
import { Measure } from '../../../../models/measure.model';

@Component({
  selector: 'app-exercise-list',
  standalone: false,
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
  @Input() availableMeasures: Measure[] = [];

  @Output() onUpdate: EventEmitter<UpdateExerciseDTO>;
  @Output() onDelete: EventEmitter<string>;

  displayedExercises: Exercise[] = [];
  displayExercise: string = "";

  exerciseToDeleteId: string = "";
  exerciseToDeleteName: string = "";

  exerciseToUpdateId: string = "";
  exerciseToUpdateName: string = "";
  exerciseToUpdateImage: string = "";
  exerciseToUpdateDescription: string = "";
  exerciseToUpdateMeasures: Measure[] = [];
  updateIsInvalid: boolean = false;

  constructor () {
    this.onUpdate = new EventEmitter<UpdateExerciseDTO>;
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

    if (this.exerciseToUpdateId === exerciseId) {
      this.exerciseToUpdateId = "";
    }
  }

  updateExerciseHandler(exerciseId: string) {
    if (this.exerciseToUpdateId === exerciseId) {
      this.displayExercise = "";
      this.exerciseToUpdateId = "";
      this.exerciseToUpdateName = "";
      this.exerciseToUpdateImage = "";
      this.exerciseToUpdateDescription = "";
      this.exerciseToUpdateMeasures = [];
      return;
    }

    const exercise = this.exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    this.displayExercise = exerciseId;

    this.exerciseToUpdateId = exerciseId;
    this.exerciseToUpdateName = exercise.exercise_name;
    this.exerciseToUpdateImage = exercise.image;
    this.exerciseToUpdateDescription = exercise.description;
    this.exerciseToUpdateMeasures = [...exercise.trackable_measures];
  }

  addUpdatedMeasures(event: any) {
    if (!event.target.value) return;

    const value = event.target.value;
    const measure = this.availableMeasures.find(m => m.id === value);
    const existingMeasure = this.exerciseToUpdateMeasures.find(m => m.id === value);

    if (measure && !existingMeasure) {
      this.exerciseToUpdateMeasures.push(measure);
    }
  }

  removeFromUpdatedMeasures(measureId: string) {
    this.exerciseToUpdateMeasures = this.exerciseToUpdateMeasures.filter(m => m.id !== measureId);
  }

  confirmUpdate() {
    if (this.exerciseToUpdateName === "") {
      this.updateIsInvalid = true;
      return;
    }

    this.updateIsInvalid = false;

    const newExercise: UpdateExerciseDTO = {
      id: this.exerciseToUpdateId,
      exercise_name: this.exerciseToUpdateName,
      image: this.exerciseToUpdateImage,
      description: this.exerciseToUpdateDescription,
      trackable_measures: this.exerciseToUpdateMeasures.map(m => m.id),
    };

    this.onUpdate.emit(newExercise);
    this.updateExerciseHandler(this.exerciseToUpdateId);
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
