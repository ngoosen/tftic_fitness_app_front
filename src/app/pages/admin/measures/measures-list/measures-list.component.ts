import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Measure } from '../../../../models/measure.model';

@Component({
  selector: 'app-measures-list',
  standalone: false,
  templateUrl: './measures-list.component.html',
  styleUrl: './measures-list.component.scss'
})
export class MeasuresListComponent {
  @Input() measures: Measure[] = [];
  @Output() onUpdate: EventEmitter<Measure>;

  measureToUpdateId: string = "";
  measureToUpdateName: string = "";
  measureToUpdateUnit: string = "";

  constructor () {
    this.onUpdate = new EventEmitter<Measure>;
  }

  toggleUpdate(measureId: string) {
    if (this.measureToUpdateId === measureId) {
      this.measureToUpdateId = "";
      this.measureToUpdateName = "";
      this.measureToUpdateUnit = "";
      return;
    }

    const measure = this.measures.find(m => m.id === measureId);

    if (measure) {
      this.measureToUpdateId = measureId;
      this.measureToUpdateName = measure.measure_name;
      this.measureToUpdateUnit = measure.unit;
    }
  }

  confirmUpdate() {
    const existingMeasure = this.measures.find(m => m.id === this.measureToUpdateId);

    if (
      existingMeasure &&
      existingMeasure.measure_name === this.measureToUpdateName &&
      existingMeasure.unit === this.measureToUpdateUnit
    ) {
      this.toggleUpdate(this.measureToUpdateId);
      return;
    }

    this.onUpdate.emit({
      id: this.measureToUpdateId,
      measure_name: this.measureToUpdateName,
      unit: this.measureToUpdateUnit,
    })

    this.toggleUpdate(this.measureToUpdateId);
  }
}
