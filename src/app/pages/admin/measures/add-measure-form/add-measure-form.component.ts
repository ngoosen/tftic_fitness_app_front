import { Component, EventEmitter, Output } from '@angular/core';
import { CreateMeasureDTO } from '../../../../models/measure.model';

@Component({
  selector: 'app-add-measure-form',
  standalone: false,
  templateUrl: './add-measure-form.component.html',
  styleUrl: './add-measure-form.component.scss'
})
export class AddMeasureFormComponent {
  @Output() onAdd: EventEmitter<CreateMeasureDTO>;

  displayForm: boolean = false;

  measureName: string = "";
  measureUnit: string = "";

  nameIsInvalid: boolean = false;

  constructor() {
    this.onAdd = new EventEmitter<CreateMeasureDTO>;
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  addMeasure() {
    if (this.measureName === "") {
      this.nameIsInvalid = this.measureName === "";
      return;
    }

    const newMeasure: CreateMeasureDTO = {
      measure_name: this.measureName,
      unit: this.measureUnit,
    };

    this.onAdd.emit(newMeasure);

    this.measureName = "";
    this.measureUnit = "";
  }

  cancel() {
    this.measureName = "";
    this.measureUnit = "";
    this.displayForm = false;
  }
}
