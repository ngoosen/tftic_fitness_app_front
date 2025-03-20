import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateExerciseDTO } from '../../../../models/exercise.model';
import { Measure } from '../../../../models/measure.model';

@Component({
  selector: 'app-add-exercise-form',
  standalone: false,
  templateUrl: './add-exercise-form.component.html',
  styleUrl: './add-exercise-form.component.scss'
})
export class AddExerciseFormComponent {
  @Input() availableMeasures: Measure[] = [];
  @Output() onAddExercise: EventEmitter<CreateExerciseDTO>;

  displayForm: boolean = false;

  name: string = "";
  imageLink: string = "";
  description: string = "";
  measures: Measure[] = [];

  nameInvalidClass: string = "";

  constructor() {
    this.onAddExercise = new EventEmitter<CreateExerciseDTO>;
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  resetForm() {
    this.name = "";
    this.imageLink = "";
    this.description = "";
    this.measures = [];

    this.toggleForm();
  }

  addExercise() {
    if (this.name === "") {
      this.nameInvalidClass = "invalid";
      return;
    }

    this.nameInvalidClass = "";

    const newExercise: CreateExerciseDTO = {
      exercise_name: this.name.trim(),
      description: this.description.trim(),
      image: this.imageLink.trim(),
      trackable_measures: this.measures.map(m => m.id),
    };

    this.onAddExercise.emit(newExercise);
  }

  addValueToMeasures(event: any) {
    if (!event.target.value) return;

    const valueToAdd = event.target.value;
    const measureToAdd = this.availableMeasures.find(v => v.id === valueToAdd);
    const measureToAddAlreadyInArray = this.measures.find(v => v.id === valueToAdd);

    if (measureToAdd && !measureToAddAlreadyInArray) {
      this.measures.push(measureToAdd);
    }
  }

  removeValueFromMeasures(valueToRemove: string) {
    this.measures = this.measures.filter(v => v.id !== valueToRemove);
  }
}
