export interface Measure {
  id: string;
  measure_name: string;
  unit: string;
}

export interface CreateMeasureDTO {
  measure_name: string;
  unit: string;
}
