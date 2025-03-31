export interface LineChart {
  xAxisLabel: string;
  yAxisLabel: string;
  data: {
    name: string;
    series: {
      value: number;
      name: string;
    }[]
  }[]
}
