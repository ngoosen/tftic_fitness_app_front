import { Component, Input } from '@angular/core';
import dayjs from 'dayjs';
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

          firstStep = firstStep.sort((step1, step2) => {
            if (step1.measure_name < step2.measure_name) {
              return -1;
            }

            if (step1.measure_name > step2.measure_name) {
              return 1;
            }

            return 0;
          });

          const chartData: {
            name: string;
            series: {
              value: number;
              name: string;
            }[]
          }[] = [];

          let currentMeasure = "";
          let currentSeries: {
            value: number;
            name: string;
          }[] = [];

          firstStep.forEach(element => {
            if (currentMeasure !== element.measure_name) {
              if (currentMeasure !== "") {
                currentSeries = currentSeries.sort((sery1, sery2) => {
                  const date1 = dayjs(sery1.name);
                  const date2 = dayjs(sery2.name);

                  if (date1.isBefore(date2)) {
                    return -1;
                  }

                  if (date1.isAfter(date2)) {
                    return 1;
                  }

                  return 0;
                });

                chartData.push({
                  name: currentMeasure,
                  series: currentSeries,
                });
              }

              currentMeasure = element.measure_name;
              currentSeries = [];
            }

            currentSeries.push({
              value: element.measure_quantity_average,
              name: element.date,
            });
          });

          if (currentSeries.length > 0) {
            currentSeries = currentSeries.sort((sery1, sery2) => {
              const date1 = dayjs(sery1.name);
              const date2 = dayjs(sery2.name);

              if (date1.isBefore(date2)) {
                return -1;
              }

              if (date1.isAfter(date2)) {
                return 1;
              }

              return 0;
            });

            chartData.push({
              name: currentMeasure,
              series: currentSeries,
            })
          }

          this.lineChartConfig = {
            xAxisLabel: "",
            yAxisLabel: "",
            data: chartData,
          };
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }
}
