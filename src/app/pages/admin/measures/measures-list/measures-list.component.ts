import { Component, Input } from '@angular/core';
import { Measure } from '../../../../models/measure.model';

@Component({
  selector: 'app-measures-list',
  standalone: false,
  templateUrl: './measures-list.component.html',
  styleUrl: './measures-list.component.scss'
})
export class MeasuresListComponent {
  @Input() measures: Measure[] = [];

  measureToUpdateId: string = "";
  measureToUpdateName: string = "";
  measureToUpdateUnit: string = "";

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
}
