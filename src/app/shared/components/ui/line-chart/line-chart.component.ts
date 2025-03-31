import { Component, Input } from '@angular/core';
import { LineChart } from '../../../../models/line-chart.model';
import { TrainingSessionService } from '../../../../tools/services/training-session.service';

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input() exerciseId: string = "";

  lineChartConfig!: LineChart;

  constructor (private _trainingSessionService: TrainingSessionService) { }

  ngOnInit() {
    if (this.exerciseId !== "") {
      this._trainingSessionService.getByExerciseId(this.exerciseId).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }
}
