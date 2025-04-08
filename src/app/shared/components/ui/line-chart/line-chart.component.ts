import { Component, Input } from '@angular/core';
import { ChartData, ChartDataset } from 'chart.js';
import dayjs from 'dayjs';
import { TrainingSessionService } from '../../../../tools/services/training-session.service';

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input() exerciseId: string = "";

  lineChartData!: ChartData<"line", number[], string>;

  constructor (private _trainingSessionService: TrainingSessionService) { }

  ngOnInit() {
    if (this.exerciseId !== "") {
      this._trainingSessionService.getByExerciseId(this.exerciseId).subscribe({
        next: (data) => {
          if (data.length === 0) {
            return;
          }

          let firstStep: {
            date: string;
            measure_name: string;
            measure_quantity_average: number;
          }[] = [];

          data.forEach(dataElement => {
            const date = dataElement.trainingSession.training_date;

            const measuresData: {
              measure_name: string;
              measure_quantity_total: number;
              series_total: number;
            }[] = [];

            dataElement.series.forEach(sery => {
              sery.measures.forEach(measure => {
                const measureMatch = measuresData.findIndex(m => m.measure_name === measure.measure.measure_name);

                if (measureMatch >= 0) {
                  measuresData[measureMatch].measure_quantity_total = measuresData[measureMatch].measure_quantity_total + measure.measure_quantity;
                } else {
                  measuresData.push({
                    measure_name: measure.measure.measure_name,
                    measure_quantity_total: measure.measure_quantity,
                    series_total: dataElement.series.length,
                  })
                }
              });
            });

            measuresData.forEach(measure => {
              firstStep.push({
                date,
                measure_name: measure.measure_name,
                measure_quantity_average: measure.measure_quantity_total / measure.series_total,
              });
            });
          });

          firstStep = firstStep
            .sort((step1, step2) => {
              const date1 = dayjs(step1.date);
              const date2 = dayjs(step2.date);

              if (date1.isBefore(date2)) {
                return -1;
              }

              if (date1.isAfter(date2)) {
                return 1;
              }

              return 0;
            })
            .sort((step1, step2) => {
              if (step1.measure_name < step2.measure_name) {
                return -1;
              }

              if (step1.measure_name > step2.measure_name) {
                return 1;
              }

              return 0;
            });

          const labels: string[] = [];

          const datasets: ChartDataset<"line", number[]>[] = [];

          firstStep.forEach(element => {
            if (!labels.includes(element.date)) {
              labels.push(dayjs(element.date).format("DD/MM/YYYY"));
            }

            const datasetMatch = datasets.findIndex(set => set.label === element.measure_name);

            if (datasetMatch >= 0) {
              datasets[datasetMatch].data.push(element.measure_quantity_average);
            } else {
              datasets.push({
                label: element.measure_name,
                data: [element.measure_quantity_average],
                tension: 0.1,
                pointHoverRadius: 5,
                pointHitRadius: 5,
                borderColor: "#d82929",
                backgroundColor: "#d829294b",
                fill: true,
              });
            }
          });

          this.lineChartData = {
            labels,
            datasets,
          };
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }
}
