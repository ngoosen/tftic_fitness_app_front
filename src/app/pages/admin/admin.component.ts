import { Component } from '@angular/core';
import { fakeMeasures } from '../../lib/fake-data/measures.data';
import { Measure } from '../../models/measure.model';
import { MeasureService } from '../../tools/services/measure.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  measures: Measure[] = [];

  constructor (private _measureService: MeasureService) {
    _measureService.getMeasures().subscribe({
      next: (data) => {
        this.measures = data;
      },
      error: (e) => {
        console.log(e);
        this.measures = fakeMeasures;
      },
    })
  }
}
