import { Measure } from "./measure.model";

export interface Exercise {
  id: string;
  exercise_name: string;
  image: string;
  description: string;
  trackable_measures: Measure[];
}
