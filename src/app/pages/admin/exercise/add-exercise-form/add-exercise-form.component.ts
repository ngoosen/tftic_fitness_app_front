import { Component, Input } from '@angular/core';
import { Measure } from '../../../../models/measure.model';

@Component({
  selector: 'app-add-exercise-form',
  standalone: false,
  templateUrl: './add-exercise-form.component.html',
  styleUrl: './add-exercise-form.component.scss'
})
export class AddExerciseFormComponent {
  @Input() availableMeasures: Measure[] = [];

  displayForm: boolean = false;

  name: string = "";
  imageLink: string = "";
  description: string = "";
  measures: Measure[] = [];

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
    //TODO add exercise
    //TODO if success only: clear data, don't close form
    console.log("Submitting form");
  }

  addValueToMeasures(valueToAdd: string) {
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
